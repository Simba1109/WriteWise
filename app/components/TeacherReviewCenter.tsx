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

const restateComments = [
  "Great job restating the prompt.",
  "Restate the prompt in your own words.",
  "Restate the entire question.",
  "Your restatement is too close to the prompt.",
  "Make your restatement clearer.",
  "Excellent beginning.",
];

const answerComments = [
  "Great answer.",
  "Answer the entire question.",
  "Add more details.",
  "Stay focused on the prompt.",
  "Your answer is clear.",
  "Support your answer with more thinking.",
];

const citeComments = [
  "Excellent text evidence.",
  "Add evidence from the passage.",
  "Choose stronger evidence.",
  "Introduce your quotation.",
  "Use a quotation from the passage.",
  "Your evidence supports your answer well.",
];

const explainComments = [
  "Excellent explanation.",
  "Explain HOW your evidence supports your answer.",
  "Tell WHY your evidence proves your answer.",
  "Connect your evidence to your answer.",
  "Add more explanation.",
  "Great reasoning.",
];

const sumComments = [
  "Excellent conclusion.",
  "Add a concluding sentence.",
  "End with a stronger final thought.",
  "Restate your main idea.",
  "Explain why your answer matters.",
];

const generalComments = [
  "Excellent improvement!",
  "Great effort!",
  "Keep using the R.A.C.E.S. strategy.",
  "Use complete sentences.",
  "Check spelling.",
  "Check punctuation.",
  "Add more detail.",
  "Nice revision.",
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
    if (!comment) return;

    setFeedback((previous) =>
      previous.trim().length === 0 ? comment : `${previous}\n\n${comment}`
    );
  }

  function handleDropdown(value: string) {
    if (!value) return;
    addComment(value);
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
              <button
                type="button"
                onClick={onResolveHelp}
                style={resolveButton}
              >
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

          <div style={dropdownGrid}>
            <div style={dropdownGroup}>
              <label style={label}>R - Restate Feedback</label>
              <select
                value=""
                onChange={(event) => handleDropdown(event.target.value)}
                style={selectBox}
              >
                <option value="">Choose feedback...</option>
                {restateComments.map((comment) => (
                  <option key={comment} value={comment}>
                    {comment}
                  </option>
                ))}
              </select>
            </div>

            <div style={dropdownGroup}>
              <label style={label}>A - Answer Feedback</label>
              <select
                value=""
                onChange={(event) => handleDropdown(event.target.value)}
                style={selectBox}
              >
                <option value="">Choose feedback...</option>
                {answerComments.map((comment) => (
                  <option key={comment} value={comment}>
                    {comment}
                  </option>
                ))}
              </select>
            </div>

            <div style={dropdownGroup}>
              <label style={label}>C - Cite Evidence Feedback</label>
              <select
                value=""
                onChange={(event) => handleDropdown(event.target.value)}
                style={selectBox}
              >
                <option value="">Choose feedback...</option>
                {citeComments.map((comment) => (
                  <option key={comment} value={comment}>
                    {comment}
                  </option>
                ))}
              </select>
            </div>
            <div style={dropdownGroup}>
              <label style={label}>E - Explain Feedback</label>
              <select
                value=""
                onChange={(event) => handleDropdown(event.target.value)}
                style={selectBox}
              >
                <option value="">Choose feedback...</option>
                {explainComments.map((comment) => (
                  <option key={comment} value={comment}>
                    {comment}
                  </option>
                ))}
              </select>
            </div>

            <div style={dropdownGroup}>
              <label style={label}>S - Sum Up Feedback</label>
              <select
                value=""
                onChange={(event) => handleDropdown(event.target.value)}
                style={selectBox}
              >
                <option value="">Choose feedback...</option>
                {sumComments.map((comment) => (
                  <option key={comment} value={comment}>
                    {comment}
                  </option>
                ))}
              </select>
            </div>

            <div style={dropdownGroup}>
              <label style={label}>General Writing Feedback</label>
              <select
                value=""
                onChange={(event) => handleDropdown(event.target.value)}
                style={selectBox}
              >
                <option value="">Choose feedback...</option>
                {generalComments.map((comment) => (
                  <option key={comment} value={comment}>
                    {comment}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <textarea
            placeholder="Type your own feedback or choose feedback from the dropdowns above..."
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            style={textarea}
          />

          {onSaveFeedback && (
            <button
              type="button"
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

const dropdownGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 14,
  marginBottom: 18,
};

const dropdownGroup = {
  background: "white",
  border: "1px solid #d7dfd5",
  borderRadius: 14,
  padding: 14,
};

const label = {
  display: "block",
  fontSize: 17,
  fontWeight: "bold",
  marginBottom: 8,
};

const selectBox = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  fontSize: 16,
  cursor: "pointer",
};

const textarea = {
  width: "100%",
  minHeight: 170,
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