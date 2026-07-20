"use client";

import { useState } from "react";
import type {
  RevisionRequests,
  StudentWork,
} from "../types";
import TeacherReviewCard from "./TeacherReviewCard";

type Props = {
  studentName: string;
  assignmentTitle: string;
  work: StudentWork;
  onResolveHelp?: () => void;
  onSaveFeedback?: (
    feedback: string,
    needsRevision: RevisionRequests
  ) => void;
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

type FeedbackColor =
  | "blue"
  | "green"
  | "gold"
  | "purple"
  | "red"
  | "gray";

function getFeedbackPrefix(color: FeedbackColor) {
  if (color === "blue") return "🔵";
  if (color === "green") return "🟢";
  if (color === "gold") return "🟡";
  if (color === "purple") return "🟣";
  if (color === "red") return "🔴";

  return "⚙️";
}

export default function TeacherReviewCenter({
  studentName,
  assignmentTitle,
  work,
  onResolveHelp,
  onSaveFeedback,
}: Props) {
  const [feedback, setFeedback] = useState(
    work.teacherFeedback || ""
  );

  const [revision, setRevision] =
    useState<RevisionRequests>({
      restate: work.needsRevision?.restate ?? false,
      answer: work.needsRevision?.answer ?? false,
      cite: work.needsRevision?.cite ?? false,
      explain: work.needsRevision?.explain ?? false,
      sum: work.needsRevision?.sum ?? false,
    });

  const completedParts = [
    work.restate,
    work.answer,
    work.cite,
    work.explain,
    work.sum,
  ].filter((part) => part.trim().length > 0).length;

  function addComment(
    comment: string,
    color: FeedbackColor
  ) {
    if (!comment) return;

    const formattedComment = `${getFeedbackPrefix(
      color
    )} ${comment}`;

    setFeedback((previous) =>
      previous.trim().length === 0
        ? formattedComment
        : `${previous}\n\n${formattedComment}`
    );
  }

  function handleDropdown(
    value: string,
    color: FeedbackColor
  ) {
    if (!value) return;

    addComment(value, color);
  }

  function toggleRevision(
    section: keyof RevisionRequests,
    checked: boolean
  ) {
    setRevision((previous) => ({
      ...previous,
      [section]: checked,
    }));
  }

  return (
    <div style={page}>
      <section style={container}>
        <h1 style={mainTitle}>
          Teacher Review Center
        </h1>

        <div style={studentHeader}>
          <h2 style={{ margin: 0 }}>
            {studentName || "Student"}
          </h2>

          <p style={assignmentText}>
            {assignmentTitle}
          </p>
        </div>

        {work.needsHelp && (
          <div style={helpBox}>
            <strong>
              🆘 Student requested help.
            </strong>

            {work.helpMessage && (
              <p style={helpMessageStyle}>
                {work.helpMessage}
              </p>
            )}

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
          ✅ Progress: {completedParts} of 5
          R.A.C.E.S. sections completed
        </div>

        <TeacherReviewCard
          title="R - Restate"
          value={work.restate}
          needsRevision={revision.restate}
          onNeedsRevisionChange={(checked) =>
            toggleRevision("restate", checked)
          }
        />

        <TeacherReviewCard
          title="A - Answer"
          value={work.answer}
          needsRevision={revision.answer}
          onNeedsRevisionChange={(checked) =>
            toggleRevision("answer", checked)
          }
        />

        <TeacherReviewCard
          title="C - Cite Evidence"
          value={work.cite}
          needsRevision={revision.cite}
          onNeedsRevisionChange={(checked) =>
            toggleRevision("cite", checked)
          }
        />

        <TeacherReviewCard
          title="E - Explain"
          value={work.explain}
          needsRevision={revision.explain}
          onNeedsRevisionChange={(checked) =>
            toggleRevision("explain", checked)
          }
        />

        <TeacherReviewCard
          title="S - Sum Up"
          value={work.sum}
          needsRevision={revision.sum}
          onNeedsRevisionChange={(checked) =>
            toggleRevision("sum", checked)
          }
        />

        <div style={finalParagraphCard}>
          <h3 style={finalParagraphTitle}>
            Final Paragraph
          </h3>

          <div style={finalParagraphText}>
            {work.finalParagraph.trim().length > 0
              ? work.finalParagraph
              : "Student has not completed the final paragraph yet."}
          </div>
        </div>

        <div style={feedbackBox}>
          <h2 style={feedbackTitle}>
            💬 Feedback Builder
          </h2>

          <p style={feedbackSubtitle}>
            Choose comments from the dropdowns or
            type your own feedback.
          </p>

          <div style={dropdownGrid}>
            <div
              style={{
                ...dropdownGroup,
                background: "#eaf5ff",
              }}
            >
              <label style={label}>
                🔵 R — Restate
              </label>

              <p style={description}>
                Prompt in the student's own words
              </p>

              <select
                value=""
                onChange={(event) =>
                  handleDropdown(
                    event.target.value,
                    "blue"
                  )
                }
                style={selectBox}
              >
                <option value="">
                  Choose Restate feedback...
                </option>

                {restateComments.map((comment) => (
                  <option
                    key={comment}
                    value={comment}
                  >
                    {comment}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                ...dropdownGroup,
                background: "#edf8ef",
              }}
            >
              <label style={label}>
                🟢 A — Answer
              </label>

              <p style={description}>
                Clear answer to the prompt
              </p>

              <select
                value=""
                onChange={(event) =>
                  handleDropdown(
                    event.target.value,
                    "green"
                  )
                }
                style={selectBox}
              >
                <option value="">
                  Choose Answer feedback...
                </option>

                {answerComments.map((comment) => (
                  <option
                    key={comment}
                    value={comment}
                  >
                    {comment}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                ...dropdownGroup,
                background: "#fff6d8",
              }}
            >
              <label style={label}>
                🟡 C — Cite Evidence
              </label>

              <p style={description}>
                Text evidence from the passage
              </p>

              <select
                value=""
                onChange={(event) =>
                  handleDropdown(
                    event.target.value,
                    "gold"
                  )
                }
                style={selectBox}
              >
                <option value="">
                  Choose Cite feedback...
                </option>

                {citeComments.map((comment) => (
                  <option
                    key={comment}
                    value={comment}
                  >
                    {comment}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                ...dropdownGroup,
                background: "#f1eaff",
              }}
            >
              <label style={label}>
                🟣 E — Explain
              </label>

              <p style={description}>
                Student reasoning and explanation
              </p>

              <select
                value=""
                onChange={(event) =>
                  handleDropdown(
                    event.target.value,
                    "purple"
                  )
                }
                style={selectBox}
              >
                <option value="">
                  Choose Explain feedback...
                </option>

                {explainComments.map((comment) => (
                  <option
                    key={comment}
                    value={comment}
                  >
                    {comment}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                ...dropdownGroup,
                background: "#ffecec",
              }}
            >
              <label style={label}>
                🔴 S — Sum Up
              </label>

              <p style={description}>
                Conclusion or final thought
              </p>

              <select
                value=""
                onChange={(event) =>
                  handleDropdown(
                    event.target.value,
                    "red"
                  )
                }
                style={selectBox}
              >
                <option value="">
                  Choose Sum Up feedback...
                </option>

                {sumComments.map((comment) => (
                  <option
                    key={comment}
                    value={comment}
                  >
                    {comment}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                ...dropdownGroup,
                background: "#f3f3f3",
              }}
            >
              <label style={label}>
                ⚙️ General Writing
              </label>

              <p style={description}>
                Overall effort, grammar, and revision
              </p>

              <select
                value=""
                onChange={(event) =>
                  handleDropdown(
                    event.target.value,
                    "gray"
                  )
                }
                style={selectBox}
              >
                <option value="">
                  Choose General feedback...
                </option>

                {generalComments.map((comment) => (
                  <option
                    key={comment}
                    value={comment}
                  >
                    {comment}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <textarea
            placeholder="Teacher feedback will appear here. You can also type your own feedback..."
            value={feedback}
            onChange={(event) =>
              setFeedback(event.target.value)
            }
            style={textarea}
          />

          {onSaveFeedback && (
            <button
              type="button"
              onClick={() =>
                onSaveFeedback(feedback, revision)
              }
              style={saveButton}
            >
              💾 Save Feedback and Revision Requests
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
  maxWidth: 950,
  margin: "20px auto",
  background: "white",
  padding: 34,
  borderRadius: 28,
  boxShadow: "0 10px 24px rgba(0,0,0,.08)",
};

const mainTitle = {
  fontSize: 38,
  marginTop: 0,
  marginBottom: 18,
};

const studentHeader = {
  background: "#f7f3ea",
  border: "2px solid #d8c8a8",
  borderRadius: 20,
  padding: 18,
  marginBottom: 20,
};

const assignmentText = {
  fontSize: 20,
  margin: "8px 0 0",
};

const progressBox = {
  background: "#eef5ec",
  border: "2px solid #c9d9c6",
  padding: 18,
  borderRadius: 16,
  fontSize: 20,
  marginBottom: 24,
  fontWeight: "bold",
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

const helpMessageStyle = {
  margin: "12px 0 0",
  whiteSpace: "pre-wrap" as const,
};

const resolveButton = {
  width: "100%",
  marginTop: 14,
  padding: 16,
  fontSize: 18,
  borderRadius: 14,
  cursor: "pointer",
};

const finalParagraphCard = {
  background: "white",
  border: "2px solid #ddd",
  borderRadius: 18,
  padding: 20,
  marginBottom: 18,
};

const finalParagraphTitle = {
  marginTop: 0,
  marginBottom: 12,
};

const finalParagraphText = {
  minHeight: 90,
  padding: 14,
  background: "#f8f8f8",
  borderRadius: 12,
  whiteSpace: "pre-wrap" as const,
  fontSize: 18,
};

const feedbackBox = {
  background: "#eef5ec",
  border: "3px solid #6b8f71",
  borderRadius: 24,
  padding: 24,
  marginTop: 28,
  boxShadow: "0 8px 18px rgba(0,0,0,.08)",
};

const feedbackTitle = {
  margin: 0,
  fontSize: 30,
};

const feedbackSubtitle = {
  marginTop: 8,
  marginBottom: 18,
  fontSize: 17,
  color: "#4b5d4a",
};

const dropdownGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 16,
  marginBottom: 20,
};

const dropdownGroup = {
  border: "2px solid rgba(0,0,0,.08)",
  borderRadius: 18,
  padding: 16,
  boxShadow: "0 4px 10px rgba(0,0,0,.05)",
};

const label = {
  display: "block",
  fontSize: 19,
  fontWeight: "bold",
  marginBottom: 4,
};

const description = {
  margin: "0 0 10px",
  fontSize: 14,
  color: "#555",
};

const selectBox = {
  width: "100%",
  padding: 13,
  borderRadius: 12,
  fontSize: 16,
  cursor: "pointer",
  border: "1px solid #bbb",
  background: "white",
};

const textarea = {
  width: "100%",
  minHeight: 190,
  padding: 18,
  fontSize: 18,
  borderRadius: 16,
  border: "2px solid #c9d9c6",
  background: "#fffdf4",
  boxShadow: "inset 0 2px 6px rgba(0,0,0,.06)",
  boxSizing: "border-box" as const,
};

const saveButton = {
  width: "100%",
  marginTop: 16,
  padding: 18,
  fontSize: 22,
  borderRadius: 16,
  cursor: "pointer",
  background: "#6b8f71",
  color: "white",
  fontWeight: "bold",
  border: "none",
};