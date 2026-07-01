"use client";

import type { Assignment, StudentWork } from "../types";
import AssignmentStatus from "./AssignmentStatus";

type Props = {
  studentName: string;
  assignments: Assignment[];
  onOpen: (assignment: Assignment) => void;
};

function getStudentWorkKey(studentName: string, assignmentId: string) {
  return `writewise-work-${studentName.trim().toLowerCase()}-${assignmentId}`;
}

function getStudentWork(
  studentName: string,
  assignmentId: string
): StudentWork | null {
  const saved = localStorage.getItem(getStudentWorkKey(studentName, assignmentId));

  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

function hasUnreadFeedback(work: StudentWork | null) {
  return (
    !!work?.teacherFeedback &&
    work.teacherFeedback.trim().length > 0 &&
    work.feedbackSeen === false
  );
}

export default function StudentAssignmentLibrary({
  studentName,
  assignments,
  onOpen,
}: Props) {
  return (
    <div style={box}>
      <h1 style={{ marginTop: 0 }}>📚 My Assignments</h1>

      {assignments.length === 0 ? (
        <p>No assignments have been published yet.</p>
      ) : (
        assignments.map((assignment) => {
          const work = getStudentWork(studentName, assignment.id);
          const unreadFeedback = hasUnreadFeedback(work);

          return (
            <button
              key={assignment.id}
              onClick={() => onOpen(assignment)}
              style={{
                ...assignmentButton,
                border: unreadFeedback
                  ? "3px solid #6b8f71"
                  : "2px solid #ddd",
              }}
            >
              <div style={titleRow}>
                <span>📘 {assignment.title}</span>

                {unreadFeedback && (
                  <span style={feedbackBadge}>💬 New Feedback</span>
                )}
              </div>

              <div style={prompt}>{assignment.prompt}</div>

              <AssignmentStatus
                studentName={studentName}
                assignment={assignment}
              />
            </button>
          );
        })
      )}
    </div>
  );
}

const box = {
  background: "white",
  borderRadius: 22,
  padding: 28,
  boxShadow: "0 8px 18px rgba(0,0,0,.08)",
};

const assignmentButton = {
  width: "100%",
  textAlign: "left" as const,
  padding: 20,
  marginTop: 16,
  borderRadius: 16,
  cursor: "pointer",
  background: "#f9f9f9",
};

const titleRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "center",
  fontSize: 24,
  fontWeight: "bold",
};

const prompt = {
  marginTop: 8,
  fontSize: 18,
  color: "#555",
};

const feedbackBadge = {
  background: "#eef5ec",
  color: "#2f6f3a",
  border: "2px solid #6b8f71",
  borderRadius: 999,
  padding: "6px 12px",
  fontSize: 16,
  whiteSpace: "nowrap" as const,
};