"use client";

import { useState } from "react";
import type { Assignment, StudentWork } from "../types";

type Props = {
  assignments: Assignment[];
  onOpenStudentWork: (
    studentName: string,
    assignment: Assignment,
    work: StudentWork
  ) => void;
};

function getProgress(work: StudentWork) {
  const completed = [
    work.restate,
    work.answer,
    work.cite,
    work.explain,
    work.sum,
  ].filter((part) => part.trim().length > 0).length;

  return Math.round((completed / 5) * 100);
}

function getStatus(progress: number) {
  if (progress === 100) return "Completed";
  if (progress > 0) return "In Progress";
  return "Not Started";
}

function getSavedStudentWork(assignments: Assignment[]) {
  const students: {
    studentName: string;
    assignmentId: string;
    work: StudentWork;
  }[] = [];

  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);

    if (!key || !key.startsWith("writewise-work-")) continue;

    const saved = localStorage.getItem(key);
    if (!saved) continue;

    try {
      const work: StudentWork = JSON.parse(saved);
      const withoutPrefix = key.replace("writewise-work-", "");

      const assignment = assignments.find((item) =>
        withoutPrefix.endsWith(`-${item.id}`)
      );

      if (!assignment) continue;

      const studentName = withoutPrefix
        .slice(0, withoutPrefix.length - assignment.id.length - 1)
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

      students.push({
        studentName,
        assignmentId: assignment.id,
        work,
      });
    } catch {
      continue;
    }
  }

  return students;
}

export default function TeacherDashboard({
  assignments,
  onOpenStudentWork,
}: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    | "All"
    | "Needs Help"
    | "Unread Feedback"
    | "Completed"
    | "In Progress"
    | "Not Started"
  >("All");

  const savedWork = getSavedStudentWork(assignments);

  return (
    <div style={box}>
      <h2 style={{ marginTop: 0 }}>📚 Teacher Dashboard</h2>

      <input
        placeholder="Search student name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchBox}
      />

      <div style={filterRow}>
        {[
          "All",
          "Needs Help",
          "Unread Feedback",
          "Completed",
          "In Progress",
          "Not Started",
        ].map((item) => (
          <button
            key={item}
            onClick={() =>
              setFilter(
                item as
                  | "All"
                  | "Needs Help"
                  | "Unread Feedback"
                  | "Completed"
                  | "In Progress"
                  | "Not Started"
              )
            }
            style={{
              ...filterButton,
              background: filter === item ? "#6b8f71" : "white",
              color: filter === item ? "white" : "black",
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {assignments.map((assignment) => {
        const allForAssignment = savedWork.filter(
          (student) => student.assignmentId === assignment.id
        );

        const helpCount = allForAssignment.filter(
          (student) => student.work.needsHelp === true
        ).length;

        const unreadFeedbackCount = allForAssignment.filter(
          (student) =>
            student.work.teacherFeedback &&
            student.work.teacherFeedback.trim().length > 0 &&
            student.work.feedbackSeen === false
        ).length;

        const studentsForAssignment = allForAssignment
          .filter((student) =>
            student.studentName.toLowerCase().includes(search.toLowerCase())
          )
          .filter((student) => {
            const status = getStatus(getProgress(student.work));

            if (filter === "Needs Help") {
              return student.work.needsHelp === true;
            }

            if (filter === "Unread Feedback") {
              return (
                !!student.work.teacherFeedback &&
                student.work.teacherFeedback.trim().length > 0 &&
                student.work.feedbackSeen === false
              );
            }

            return filter === "All" || status === filter;
          });

        return (
          <div key={assignment.id} style={assignmentBox}>
            <h3 style={{ fontSize: 24, marginTop: 0 }}>
              📘 {assignment.title}
            </h3>

            <p>
              {studentsForAssignment.length} student(s) shown
              {helpCount > 0 && (
                <span style={helpBadge}>🆘 {helpCount} need help</span>
              )}
              {unreadFeedbackCount > 0 && (
                <span style={feedbackBadge}>
                  💬 {unreadFeedbackCount} unread feedback
                </span>
              )}
            </p>

            {studentsForAssignment.length === 0 ? (
              <p>No matching student work.</p>
            ) : (
              studentsForAssignment.map((student) => {
                const progress = getProgress(student.work);
                const status = getStatus(progress);

                const hasUnreadFeedback =
                  !!student.work.teacherFeedback &&
                  student.work.teacherFeedback.trim().length > 0 &&
                  student.work.feedbackSeen === false;

                return (
                  <button
                    key={`${student.studentName}-${assignment.id}`}
                    onClick={() =>
                      onOpenStudentWork(
                        student.studentName,
                        assignment,
                        student.work
                      )
                    }
                    style={{
                      ...studentButton,
                      border:
                        student.work.needsHelp === true
                          ? "3px solid #d9534f"
                          : hasUnreadFeedback
                          ? "3px solid #6b8f71"
                          : "1px solid #ccc",
                    }}
                  >
                    <div style={{ fontSize: 20, fontWeight: "bold" }}>
                      {student.work.needsHelp === true && "🆘 "}
                      {hasUnreadFeedback && "💬 "}
                      {student.studentName}
                    </div>

                    <div style={{ fontSize: 17, marginTop: 6 }}>
                      {status === "Completed"
                        ? "✅ Completed"
                        : status === "In Progress"
                        ? "🟡 In Progress"
                        : "⚪ Not Started"}{" "}
                      — {progress}%
                    </div>

                    {student.work.needsHelp === true && (
                      <div style={helpMessage}>Student requested help.</div>
                    )}

                    {hasUnreadFeedback && (
                      <div style={feedbackMessage}>
                        Student has not read teacher feedback yet.
                      </div>
                    )}

                    <div style={progressTrack}>
                      <div
                        style={{
                          ...progressBar,
                          width: `${progress}%`,
                        }}
                      />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        );
      })}
    </div>
  );
}

const box = {
  background: "white",
  border: "2px solid #ddd",
  borderRadius: 22,
  padding: 28,
  marginBottom: 24,
};

const searchBox = {
  width: "100%",
  padding: 16,
  fontSize: 20,
  borderRadius: 14,
  border: "1px solid #ccc",
  marginBottom: 16,
};

const filterRow = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap" as const,
  marginBottom: 20,
};

const filterButton = {
  padding: "12px 16px",
  borderRadius: 999,
  border: "1px solid #ccc",
  cursor: "pointer",
  fontSize: 16,
};

const assignmentBox = {
  background: "#f9f9f9",
  border: "2px solid #ddd",
  borderRadius: 18,
  padding: 20,
  marginTop: 18,
};

const studentButton = {
  width: "100%",
  textAlign: "left" as const,
  padding: 16,
  marginTop: 12,
  borderRadius: 14,
  background: "white",
  cursor: "pointer",
};

const progressTrack = {
  background: "#ddd",
  height: 12,
  borderRadius: 999,
  overflow: "hidden",
  marginTop: 10,
};

const progressBar = {
  height: "100%",
  background: "#6b8f71",
};

const helpBadge = {
  display: "inline-block",
  marginLeft: 10,
  padding: "6px 10px",
  borderRadius: 999,
  background: "#fbeaea",
  color: "#8a1f1f",
  fontWeight: "bold",
};

const feedbackBadge = {
  display: "inline-block",
  marginLeft: 10,
  padding: "6px 10px",
  borderRadius: 999,
  background: "#eef5ec",
  color: "#2f6f3a",
  fontWeight: "bold",
};

const helpMessage = {
  marginTop: 8,
  background: "#fbeaea",
  color: "#8a1f1f",
  padding: 10,
  borderRadius: 10,
  fontWeight: "bold",
};

const feedbackMessage = {
  marginTop: 8,
  background: "#eef5ec",
  color: "#2f6f3a",
  padding: 10,
  borderRadius: 10,
  fontWeight: "bold",
};