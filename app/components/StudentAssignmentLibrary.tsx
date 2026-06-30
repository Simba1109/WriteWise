"use client";

import type { Assignment } from "../types";
import AssignmentStatus from "./AssignmentStatus";

type Props = {
  studentName: string;
  assignments: Assignment[];
  onOpen: (assignment: Assignment) => void;
};

export default function StudentAssignmentLibrary({
  studentName,
  assignments,
  onOpen,
}: Props) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 22,
        padding: 28,
        boxShadow: "0 8px 18px rgba(0,0,0,.08)",
      }}
    >
      <h1 style={{ marginTop: 0 }}>📚 My Assignments</h1>

      {assignments.length === 0 ? (
        <p>No assignments have been published yet.</p>
      ) : (
        assignments.map((assignment) => (
          <button
            key={assignment.id}
            onClick={() => onOpen(assignment)}
            style={{
              width: "100%",
              textAlign: "left",
              padding: 20,
              marginTop: 16,
              borderRadius: 16,
              cursor: "pointer",
              border: "2px solid #ddd",
              background: "#f9f9f9",
            }}
          >
            <div style={{ fontSize: 24, fontWeight: "bold" }}>
              📘 {assignment.title}
            </div>

            <div style={{ marginTop: 8, fontSize: 18, color: "#555" }}>
              {assignment.prompt}
            </div>

            <AssignmentStatus studentName={studentName} assignment={assignment} />
          </button>
        ))
      )}
    </div>
  );
}