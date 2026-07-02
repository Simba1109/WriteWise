"use client";

import { useState } from "react";
import type { Assignment, StudentWork } from "../types";

type Props = {
  studentName: string;
  assignments: Assignment[];
  currentWork: StudentWork;
};

function getStudentWorkKey(studentName: string, assignmentId: string) {
  return `writewise-work-${studentName.trim().toLowerCase()}-${assignmentId}`;
}

function loadWork(studentName: string, assignmentId: string): StudentWork | null {
  const saved = localStorage.getItem(
    getStudentWorkKey(studentName, assignmentId)
  );

  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

function isComplete(work: StudentWork | null) {
  if (!work) return false;

  return (
    work.restate.trim().length > 0 &&
    work.answer.trim().length > 0 &&
    work.cite.trim().length > 0 &&
    work.explain.trim().length > 0 &&
    work.sum.trim().length > 0
  );
}

function hasEvidence(work: StudentWork | null) {
  if (!work) return false;
  return work.cite.trim().length > 0;
}

export default function StudentBadges({
  studentName,
  assignments,
  currentWork,
}: Props) {
  const [open, setOpen] = useState(false);

  const allWork = assignments.map((assignment) =>
    loadWork(studentName, assignment.id)
  );

  const completedCount = allWork.filter(isComplete).length;
  const evidenceCount = allWork.filter(hasEvidence).length;

  const badges = [
    {
      earned: isComplete(currentWork),
      icon: "📝",
      title: "Paragraph Perfect",
    },
    {
      earned: completedCount >= 1,
      icon: "🥇",
      title: "First Complete",
    },
    {
      earned: completedCount >= 3,
      icon: "🔥",
      title: "3 Complete",
    },
    {
      earned: evidenceCount >= 5,
      icon: "📚",
      title: "Evidence Expert",
    },
    {
      earned:
        !!currentWork.teacherFeedback &&
        currentWork.teacherFeedback.toLowerCase().includes("excellent"),
      icon: "⭐",
      title: "Teacher Star",
    },
  ];

  const earnedBadges = badges.filter((badge) => badge.earned);

  return (
    <div style={box}>
      <button onClick={() => setOpen(!open)} style={header}>
        <span>🏆 My Badges</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <>
          {earnedBadges.length === 0 ? (
            <div style={empty}>Keep writing to earn badges.</div>
          ) : (
            <div style={badgeList}>
              {earnedBadges.map((badge) => (
                <div key={badge.title} style={badgePill}>
                  <span style={icon}>{badge.icon}</span>
                  <span>{badge.title}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

const box = {
  background: "white",
  border: "2px solid #ddd",
  borderRadius: 18,
  marginBottom: 18,
  overflow: "hidden",
};

const header = {
  width: "100%",
  padding: 16,
  border: "none",
  background: "white",
  cursor: "pointer",
  fontSize: 20,
  fontWeight: "bold",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const badgeList = {
  padding: "0 14px 14px",
};

const badgePill = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "#fff8e6",
  border: "2px solid #e0b64b",
  borderRadius: 12,
  padding: "10px 12px",
  marginTop: 10,
  fontSize: 17,
  fontWeight: "bold",
};

const icon = {
  fontSize: 22,
};

const empty = {
  padding: 16,
  fontSize: 16,
  color: "#555",
};