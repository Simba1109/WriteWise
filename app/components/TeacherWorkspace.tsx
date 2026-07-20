"use client";

import { useState } from "react";
import type {
  Assignment,
  RevisionRequests,
  StudentWork,
} from "../types";
import TeacherDashboard from "./TeacherDashboard";
import LessonBuilder from "./LessonBuilder";
import TeacherReviewCenter from "./TeacherReviewCenter";
import { saveStudentWork } from "../writewiseStore";

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
  const [view, setView] = useState<
    "dashboard" | "builder" | "review"
  >("dashboard");

  const [reviewStudentName, setReviewStudentName] =
    useState("");

  const [reviewAssignment, setReviewAssignment] =
    useState<Assignment | null>(null);

  const [reviewWork, setReviewWork] =
    useState<StudentWork | null>(null);

  function openStudentWork(
    studentName: string,
    assignment: Assignment,
    work: StudentWork
  ) {
    setReviewStudentName(studentName);
    setReviewAssignment(assignment);
    setReviewWork(work);
    setView("review");
  }

  function resolveHelp() {
    if (!reviewAssignment || !reviewWork) return;

    const updatedWork: StudentWork = {
      ...reviewWork,
      needsHelp: false,
      helpMessage: "",
    };

    saveStudentWork(
      reviewStudentName,
      reviewAssignment.id,
      updatedWork
    );

    setReviewWork(updatedWork);
  }

  function saveFeedback(
    feedback: string,
    needsRevision: RevisionRequests
  ) {
    if (!reviewAssignment || !reviewWork) return;

    const updatedWork: StudentWork = {
      ...reviewWork,
      teacherFeedback: feedback,
      feedbackSeen: false,
      needsRevision,
    };

    saveStudentWork(
      reviewStudentName,
      reviewAssignment.id,
      updatedWork
    );

    setReviewWork(updatedWork);

    alert("Feedback and revision requests saved.");
  }

  if (
    view === "review" &&
    reviewWork &&
    reviewAssignment
  ) {
    return (
      <main style={page}>
        <button
          onClick={() => setView("dashboard")}
          style={backButton}
        >
          ← Back to Dashboard
        </button>

        <TeacherReviewCenter
          studentName={reviewStudentName}
          assignmentTitle={reviewAssignment.title}
          work={reviewWork}
          onResolveHelp={resolveHelp}
          onSaveFeedback={saveFeedback}
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
        <h1 style={{ fontSize: 44 }}>
          Teacher Workspace
        </h1>

        <div style={tabs}>
          <button
            onClick={() => setView("dashboard")}
            style={tabButton}
          >
            📊 Dashboard
          </button>

          <button
            onClick={() => setView("builder")}
            style={tabButton}
          >
            📝 Assignments
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