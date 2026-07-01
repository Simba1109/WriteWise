"use client";

import { useState } from "react";
import type { StudentWork } from "../types";
import TeacherReviewCard from "./TeacherReviewCard";

type Props = {
  studentName: string;
  assignmentTitle: string;
  work: StudentWork;
  onResolveHelp?: () => void;
  onSaveFeedback?: (feedback: string) => void;
};

const commentBank = [
  "Excellent job using text evidence!",
  "Great restatement of the prompt.",
  "Answer the question more completely.",
  "Add stronger evidence from the passage.",
  "Explain HOW your evidence supports your answer.",
  "Finish with a stronger conclusion.",
  "Remember to use complete sentences.",
  "Check spelling and capitalization.",
  "Excellent improvement!",
  "Keep going—you are making progress!",
];

export default function TeacherReviewCenter({
  studentName,
  assignmentTitle,
  work,
  onResolveHelp,
  onSaveFeedback,
}: Props) {
  const [feedback, setFeedback] = useState(work.teacherFeedback || "");

  const completedParts = [
    work.restate,
    work.answer,
    work.cite,
    work.explain,
    work.sum,
  ].filter((part) => part.trim().length > 0).length;

  function addComment(comment: string) {
    setFeedback((previous) =>
      previous.trim().length === 0
        ? comment
        : `${previous}\n\n${comment}`
    );
  }

  return (
    <div style={page}>
      <section style={container}>
        <h1>Teacher Review Center</h1>

        <h2>{studentName || "Student"}</h2>
        <p style={{ fontSize: 20 }}>{assignmentTitle}</p>

        {work.needsHelp && (
          <div style={helpBox}>
            <strong>🆘 Student requested help.</strong>

            {onResolveHelp && (
              <button onClick={onResolveHelp} style={resolveButton}>
                Mark Help Resolved
              </button>
            )}
          </div>
        )}

        <div style={progressBox}>
          Progress: {completedParts} of 5 R.A.C.E.S. sections completed
        </div>

        <TeacherReviewCard title="R - Restate" value={work.restate} />
        <TeacherReviewCard title="A - Answer" value={work.answer} />
        <TeacherReviewCard title="C - Cite Evidence" value={work.cite} />
        <TeacherReviewCard title="E - Explain" value={work.explain} />
        <TeacherReviewCard title="S - Sum Up" value={work.sum} />

        <TeacherReviewCard
          title="Final Paragraph"
          value={work.finalParagraph}
        />

        <div style={feedbackBox}>
          <h2>💬 Teacher Feedback</h2>

          <div style={bankGrid}>
            {commentBank.map((comment) => (
              <button
                key={comment}
                onClick={() => addComment(comment)}
                style={bankButton}
              >
                {comment}
              </button>
            ))}
          </div>

          <textarea
            placeholder="Type feedback, encouragement, or revision notes here..."
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            style={textarea}
          />

          {onSaveFeedback && (
            <button
              onClick={() => onSaveFeedback(feedback)}
              style={saveButton}
            >
              Save Feedback
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
const page = {
  background: "#f5efe4",
  minHeight: "100vh",
  padding: 32,
  fontFamily: "Arial",
};

const container = {
  maxWidth: 900,
  margin: "20px auto",
  background: "white",
  padding: 32,
  borderRadius: 24,
};

const progressBox = {
  background: "#eef5ec",
  padding: 18,
  borderRadius: 16,
  fontSize: 20,
  marginBottom: 24,
};

const helpBox = {
  background: "#fbeaea",
  border: "3px solid #d9534f",
  color: "#8a1f1f",
  padding: 18,
  borderRadius: 16,
  fontSize: 20,
  marginBottom: 24,
};

const resolveButton = {
  width: "100%",
  marginTop: 14,
  padding: 16,
  fontSize: 18,
  borderRadius: 14,
  cursor: "pointer",
};

const feedbackBox = {
  background: "#eef5ec",
  border: "2px solid #c9d9c6",
  borderRadius: 18,
  padding: 20,
  marginTop: 24,
};

const bankGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
  marginBottom: 18,
};

const bankButton = {
  padding: 12,
  borderRadius: 10,
  cursor: "pointer",
  fontSize: 16,
  textAlign: "left" as const,
};

const textarea = {
  width: "100%",
  minHeight: 150,
  padding: 16,
  fontSize: 18,
  borderRadius: 12,
  border: "1px solid #ccc",
};

const saveButton = {
  width: "100%",
  marginTop: 14,
  padding: 16,
  fontSize: 20,
  borderRadius: 14,
  cursor: "pointer",
  background: "#6b8f71",
  color: "white",
};