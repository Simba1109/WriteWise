"use client";

import { useEffect, useState } from "react";
import type { Assignment } from "../types";
import AssignmentLibrary from "./AssignmentLibrary";
import AssignmentEditor from "./AssignmentEditor";

type Props = {
  onBack: () => void;
  onPublishAssignment: (assignment: Assignment) => void;
};

export default function LessonBuilder({
  onBack,
  onPublishAssignment,
}: Props) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [editingAssignment, setEditingAssignment] =
    useState<Assignment | null>(null);

  useEffect(() => {
    loadAssignments();
  }, []);

  function loadAssignments() {
    const saved = localStorage.getItem("writewise-assignments");

    if (saved) {
      setAssignments(JSON.parse(saved));
    } else {
      setAssignments([]);
    }
  }

  function saveAssignments(updated: Assignment[]) {
    localStorage.setItem("writewise-assignments", JSON.stringify(updated));
    setAssignments(updated);
  }

  function saveAssignment(assignment: Assignment) {
    const assignmentToSave: Assignment = {
      ...assignment,
      isPublished: assignment.isPublished ?? true,
    };

    let updated: Assignment[];

    if (editingAssignment) {
      updated = assignments.map((item) =>
        item.id === assignmentToSave.id ? assignmentToSave : item
      );

      setEditingAssignment(null);
    } else {
      updated = [...assignments, assignmentToSave];
    }

    saveAssignments(updated);
    onPublishAssignment(assignmentToSave);
  }

  function editAssignment(assignment: Assignment) {
    setEditingAssignment(assignment);

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }

  function duplicateAssignment(assignment: Assignment) {
    const copy: Assignment = {
      ...assignment,
      id: Date.now().toString(),
      title: `${assignment.title} (Copy)`,
      isPublished: false,
    };

    saveAssignments([...assignments, copy]);
  }

  function togglePublishAssignment(id: string) {
    const updated = assignments.map((assignment) =>
      assignment.id === id
        ? {
            ...assignment,
            isPublished: !(assignment.isPublished ?? true),
          }
        : assignment
    );

    saveAssignments(updated);
  }

  function deleteAssignment(id: string) {
    if (!confirm("Delete this assignment?")) return;

    const updated = assignments.filter((assignment) => assignment.id !== id);

    saveAssignments(updated);

    if (editingAssignment?.id === id) {
      setEditingAssignment(null);
    }
  }

  return (
    <main style={page}>
      <button onClick={onBack} style={backButton}>
        ← Dashboard
      </button>

      <section style={container}>
        <h1 style={{ fontSize: 44 }}>Assignments</h1>

        <AssignmentLibrary
          assignments={assignments}
          onEditAssignment={editAssignment}
          onDeleteAssignment={deleteAssignment}
          onDuplicateAssignment={duplicateAssignment}
          onTogglePublishAssignment={togglePublishAssignment}
        />

        {editingAssignment && (
          <div style={editNotice}>
            ✏️ Editing: <strong>{editingAssignment.title}</strong>
          </div>
        )}

        <AssignmentEditor
          key={editingAssignment ? editingAssignment.id : "new"}
          editingAssignment={editingAssignment}
          onCancelEdit={() => setEditingAssignment(null)}
          onSaveAssignment={saveAssignment}
        />
      </section>
    </main>
  );
}

const page = {
  minHeight: "100vh",
  background: "#f5efe4",
  padding: 32,
  fontFamily: "Arial",
};

const container = {
  maxWidth: 1100,
  margin: "20px auto",
};

const backButton = {
  padding: 14,
  borderRadius: 12,
  cursor: "pointer",
};

const editNotice = {
  background: "#fff8d6",
  border: "2px solid #e0c95c",
  padding: 18,
  borderRadius: 16,
  fontSize: 20,
  marginBottom: 20,
};