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

  if (completedParts === 0) return "Not Started";
  if (completedParts === 5) return "Completed";
  return "In Progress";
}

export default function AssignmentStatus({ studentName, assignment }: Props) {
  const key = getStudentWorkKey(studentName, assignment.id);
  const saved = localStorage.getItem(key);
  const work: StudentWork | null = saved ? JSON.parse(saved) : null;
  const status = getStatus(work);

  return (
    <span
      style={{
        display: "inline-block",
        marginTop: 10,
        padding: "8px 12px",
        borderRadius: 999,
        fontSize: 16,
        background:
          status === "Completed"
            ? "#e8f5e9"
            : status === "In Progress"
            ? "#fff8d6"
            : "#f1f1f1",
        border: "1px solid #ccc",
      }}
    >
      {status === "Completed"
        ? "✅ Completed"
        : status === "In Progress"
        ? "🟡 In Progress"
        : "⚪ Not Started"}
    </span>
  );
}