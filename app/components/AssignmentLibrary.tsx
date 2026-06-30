"use client";

import { useState } from "react";
import type { Assignment } from "../types";

type Props = {
  assignments: Assignment[];
  onEditAssignment: (assignment: Assignment) => void;
  onDeleteAssignment: (assignmentId: string) => void;
  onDuplicateAssignment: (assignment: Assignment) => void;
  onTogglePublishAssignment: (assignmentId: string) => void;
};

export default function AssignmentLibrary({
  assignments,
  onEditAssignment,
  onDeleteAssignment,
  onDuplicateAssignment,
  onTogglePublishAssignment,
}: Props) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  function closeMenu() {
    setOpenMenu(null);
  }

  return (
    <div style={box}>
      <h2 style={{ marginTop: 0 }}>Assignments</h2>

      {assignments.length === 0 ? (
        <p>No assignments yet.</p>
      ) : (
        assignments.map((assignment) => (
          <div key={assignment.id} style={card}>
            <div style={row}>
              <div style={{ flex: 1 }}>
                <div style={title}>
                  📘 {assignment.title}
                  <span
                    style={{
                      marginLeft: 12,
                      color: assignment.isPublished === false ? "#b45309" : "#15803d",
                      fontSize: 16,
                      fontWeight: "normal",
                    }}
                  >
                    {assignment.isPublished === false
                      ? "🟠 Draft"
                      : "🟢 Published"}
                  </span>
                </div>

                <div style={prompt}>{assignment.prompt}</div>
              </div>

              <button
                type="button"
                style={menuButton}
                onClick={() =>
                  setOpenMenu(
                    openMenu === assignment.id ? null : assignment.id
                  )
                }
              >
                ⋮
              </button>

              {openMenu === assignment.id && (
                <div style={menu}>
                  <button
                    style={menuItem}
                    onClick={() => {
                      closeMenu();
                      onEditAssignment(assignment);
                    }}
                  >
                    ✏️ Edit Assignment
                  </button>

                  <button
                    style={menuItem}
                    onClick={() => {
                      closeMenu();
                      onDuplicateAssignment(assignment);
                    }}
                  >
                    📄 Duplicate Assignment
                  </button>

                  <button
                    style={menuItem}
                    onClick={() => {
                      closeMenu();
                      onTogglePublishAssignment(assignment.id);
                    }}
                  >
                    {assignment.isPublished === false
                      ? "📤 Publish"
                      : "📥 Unpublish"}
                  </button>

                  <button
                    style={menuItem}
                    onClick={() => {
                      closeMenu();
                      onDeleteAssignment(assignment.id);
                    }}
                  >
                    🗑 Delete Assignment
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const box = {
  background: "white",
  border: "2px solid #ddd",
  borderRadius: 20,
  padding: 24,
  marginBottom: 24,
};

const card = {
  background: "#eef5ec",
  padding: 18,
  borderRadius: 16,
  marginTop: 14,
  position: "relative" as const,
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
};

const title = {
  fontSize: 22,
  fontWeight: "bold",
};

const prompt = {
  marginTop: 8,
  fontSize: 17,
};

const menuButton = {
  width: 42,
  height: 42,
  borderRadius: "50%",
  border: "1px solid #ccc",
  background: "white",
  cursor: "pointer",
  fontSize: 24,
};

const menu = {
  position: "absolute" as const,
  top: 55,
  right: 20,
  background: "white",
  border: "1px solid #ccc",
  borderRadius: 12,
  boxShadow: "0 6px 16px rgba(0,0,0,.15)",
  minWidth: 240,
  zIndex: 100,
};

const menuItem = {
  width: "100%",
  padding: "14px 16px",
  textAlign: "left" as const,
  border: "none",
  background: "white",
  cursor: "pointer",
  fontSize: 17,
};