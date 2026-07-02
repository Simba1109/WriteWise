"use client";

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
  const saved = localStorage.getItem(getStudentWorkKey(studentName, assignmentId));

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
  const allWork = assignments.map((assignment) =>
    loadWork(studentName, assignment.id)
  );

  const completedCount = allWork.filter(isComplete).length;
  const evidenceCount = allWork.filter(hasEvidence).length;

  const badges = [
    {
      earned: completedCount >= 1,
      icon: "🥇",
      title: "First Assignment Completed",
      description: "You completed your first full R.A.C.E.S. paragraph.",
    },
    {
      earned: completedCount >= 3,
      icon: "🔥",
      title: "Three Assignments Completed",
      description: "You completed three writing assignments.",
    },
    {
      earned: evidenceCount >= 5,
      icon: "📚",
      title: "Evidence Expert",
      description: "You used text evidence in five assignments.",
    },
    {
      earned:
        currentWork.needsHelp === false &&
        currentWork.helpMessage === "" &&
        isComplete(currentWork),
      icon: "💪",
      title: "Never Gave Up",
      description: "You kept working and finished your paragraph.",
    },
    {
      earned:
        !!currentWork.teacherFeedback &&
        currentWork.teacherFeedback.toLowerCase().includes("excellent"),
      icon: "⭐",
      title: "Teacher Star",
      description: "Your teacher gave you positive feedback.",
    },
    {
      earned: isComplete(currentWork),
      icon: "📝",
      title: "Paragraph Perfect",
      description: "You completed all five R.A.C.E.S. sections.",
    },
  ];

  return (
    <div style={box}>
      <h2 style={{ marginTop: 0 }}>🏆 My Badges</h2>

      {badges.map((badge) => (
        <div
          key={badge.title}
          style={{
            ...badgeCard,
            opacity: badge.earned ? 1 : 0.45,
          }}
        >
          <div style={icon}>{badge.icon}</div>

          <div>
            <strong>{badge.title}</strong>
            <p style={description}>
              {badge.earned ? badge.description : "Keep working to unlock this."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

const box = {
  background: "white",
  border: "2px solid #ddd",
  borderRadius: 18,
  padding: 18,
  marginBottom: 18,
};

const badgeCard = {
  display: "flex",
  gap: 12,
  alignItems: "center",
  background: "#f9f9f9",
  border: "1px solid #ddd",
  borderRadius: 14,
  padding: 12,
  marginTop: 10,
};

const icon = {
  fontSize: 32,
};

const description = {
  margin: "4px 0 0",
  fontSize: 14,
};