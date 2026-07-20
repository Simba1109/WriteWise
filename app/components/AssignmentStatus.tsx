"use client";

import type { Assignment, StudentWork } from "../types";

type Props = {
  studentName: string;
  assignment: Assignment;
};

function getStudentWorkKey(studentName: string, assignmentId: string) {
  return `writewise-work-${studentName.toLowerCase().trim()}-${assignmentId}`;
}

function getStatus(work: StudentWork | null) {
  if (!work) return "Not Started";

  const completedParts = [
    work.restate,
    work.answer,
    work.cite,
    work.explain,
    work.sum,
  ].filter((part) => part.trim().length > 0).length;

  // Teacher has requested revisions
  if (
    work.needsRevision &&
    Object.values(work.needsRevision).some((value) => value)
  ) {
    return "Revision Requested";
  }

  // Student has finished all sections and is waiting for teacher review
  if (completedParts === 5) {
    if (work.approved) {
      return "Approved";
    }

    return "Submitted";
  }

  // Student has started but not finished
  if (completedParts > 0) {
    return "In Progress";
  }

  return "Not Started";
}

export default function AssignmentStatus({ studentName, assignment }: Props) {
  const key = getStudentWorkKey(studentName, assignment.id);
  const saved = localStorage.getItem(key);
  const work: StudentWork | null = saved ? JSON.parse(saved) : null;

  const status = getStatus(work);

  const colors = {
    "Not Started": "#f1f1f1",
    "In Progress": "#fff8d6",
    Submitted: "#e3f2fd",
    "Revision Requested": "#fff3cd",
    Approved: "#e8f5e9",
  };

  const labels = {
    "Not Started": "⚪ Not Started",
    "In Progress": "🟡 In Progress",
    Submitted: "📬 Submitted",
    "Revision Requested": "🔄 Revision Requested",
    Approved: "⭐ Approved",
  };

  return (
    <span
      style={{
        display: "inline-block",
        marginTop: 10,
        padding: "8px 12px",
        borderRadius: 999,
        fontSize: 16,
        background: colors[status as keyof typeof colors],
        border: "1px solid #ccc",
      }}
    >
      {labels[status as keyof typeof labels]}
    </span>
  );
}