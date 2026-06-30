"use client";

import { useState } from "react";
import type { Assignment, StudentWork } from "../types";
import TeacherDashboard from "./TeacherDashboard";
import LessonBuilder from "./LessonBuilder";
import TeacherReviewCenter from "./TeacherReviewCenter";

type Props = {
  assignments: Assignment[];
  onBack: () => void;
  onPublishAssignment: (assignment: Assignment) => void;
};

export default function TeacherWorkspace({
  assignments,
  onBack,
  onPublishAssignment,
}: Props) {
  const [view, setView] = useState<"dashboard" | "builder" | "review">(
    "dashboard"
  );

  const [reviewStudentName, setReviewStudentName] = useState("");
  const [reviewAssignmentTitle, setReviewAssignmentTitle] = useState("");
  const [reviewWork, setReviewWork] = useState<StudentWork | null>(null);

  function openStudentWork(
    studentName: string,
    assignment: Assignment,
    work: StudentWork
  ) {
    setReviewStudentName(studentName);
    setReviewAssignmentTitle(assignment.title);
    setReviewWork(work);
    setView("review");
  }
  if (view === "review" && reviewWork) {
    return (
      <main style={page}>
        <button onClick={() => setView("dashboard")} style={backButton}>
          ← Back to Dashboard
        </button>

        <TeacherReviewCenter
          studentName={reviewStudentName}
          assignmentTitle={reviewAssignmentTitle}
          work={reviewWork}
        />
      </main>
    );
  }

  return (
    <main style={page}>
      <button onClick={onBack} style={backButton}>
        ← Home
      </button>

      <section style={container}>
        <h1 style={{ fontSize: 44 }}>Teacher Workspace</h1>

        <div style={tabs}>
          <button onClick={() => setView("dashboard")} style={tabButton}>
            📊 Dashboard
          </button>

          <button onClick={() => setView("builder")} style={tabButton}>
            📝 Lesson Builder
          </button>
        </div>

        {view === "dashboard" && (
          <TeacherDashboard
            assignments={assignments}
            onOpenStudentWork={openStudentWork}
          />
        )}

        {view === "builder" && (
          <LessonBuilder
            onBack={() => setView("dashboard")}
            onPublishAssignment={onPublishAssignment}
          />
        )}
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

const tabs = {
  display: "flex",
  gap: 12,
  marginBottom: 24,
};

const tabButton = {
  padding: 16,
  fontSize: 20,
  borderRadius: 14,
  cursor: "pointer",
};