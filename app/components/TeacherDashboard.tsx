"use client";

import type { Assignment, StudentWork } from "../types";

type Props = {
  assignments: Assignment[];
  onOpenStudentWork: (
    studentName: string,
    assignment: Assignment,
    work: StudentWork
  ) => void;
};

function getStudentWorkKey(studentName: string, assignmentId: string) {
  return `writewise-work-${studentName.toLowerCase().trim()}-${assignmentId}`;
}

function getProgress(work: StudentWork) {
  const parts = [
    work.restate,
    work.answer,
    work.cite,
    work.explain,
    work.sum,
  ];

  const completed = parts.filter((part) => part.trim().length > 0).length;

  return Math.round((completed / 5) * 100);
}

function getStatus(progress: number) {
  if (progress === 100) return "✅ Completed";
  if (progress > 0) return "🟡 In Progress";
  return "⚪ Not Started";
}

function getSavedStudentWork() {
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
      const lastDash = withoutPrefix.lastIndexOf("-");
      const studentName = withoutPrefix
        .slice(0, lastDash)
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
      const assignmentId = withoutPrefix.slice(lastDash + 1);

      students.push({
        studentName,
        assignmentId,
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
  const savedWork = getSavedStudentWork();

  return (
    <div
      style={{
        background: "white",
        border: "2px solid #ddd",
        borderRadius: 22,
        padding: 28,
        marginBottom: 24,
      }}
    >
      <h2 style={{ marginTop: 0 }}>📚 Teacher Dashboard</h2>

      <p style={{ fontSize: 20 }}>
        Review students who have started assignments.
      </p>
      {assignments.length === 0 ? (
        <p>No assignments published yet.</p>
      ) : (
        assignments.map((assignment) => {
          const studentsForAssignment = savedWork.filter(
            (student) => student.assignmentId === assignment.id
          );

          return (
            <div
              key={assignment.id}
              style={{
                background: "#f9f9f9",
                border: "2px solid #ddd",
                borderRadius: 18,
                padding: 20,
                marginTop: 18,
              }}
            >
              <h3 style={{ fontSize: 24, marginTop: 0 }}>
                📘 {assignment.title}
              </h3>

              <p style={{ fontSize: 18 }}>
                {studentsForAssignment.length} student(s) have started this assignment.
              </p>

              {studentsForAssignment.length === 0 ? (
                <p>No student work yet.</p>
              ) : (
                studentsForAssignment.map((student) => {
                  const progress = getProgress(student.work);

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
                        width: "100%",
                        textAlign: "left",
                        padding: 16,
                        marginTop: 12,
                        borderRadius: 14,
                        border: "1px solid #ccc",
                        background: "white",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontSize: 20, fontWeight: "bold" }}>
                        {student.studentName}
                      </div>

                      <div style={{ fontSize: 17, marginTop: 6 }}>
                        {getStatus(progress)} — {progress}%
                      </div>

                      <div
                        style={{
                          background: "#ddd",
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginTop: 10,
                        }}
                      >
                        <div
                          style={{
                            width: `${progress}%`,
                            height: "100%",
                            background: "#6b8f71",
                          }}
                        />
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          );
        })
      )}
    </div>
  );
}