"use client";

import { useState } from "react";
import type { StudentWork } from "../types";

type PartKey = "restate" | "answer" | "cite" | "explain" | "sum";

type Props = {
  activePart: PartKey;
  work: StudentWork;
};

const stepHelp = {
  restate: {
    title: "Restate",
    message:
      "Restate the question in your own words. Do not answer it yet.",
    hint:
      "Try starting with: The prompt is asking me to explain...",
  },
  answer: {
    title: "Answer",
    message:
      "Now give your clear answer. Say what you think or what you learned.",
    hint:
      "Try starting with: I think... or One important idea is...",
  },
  cite: {
    title: "Cite Evidence",
    message:
      "Find proof from the passage that supports your answer.",
    hint:
      "Look for one sentence from the passage that proves your idea.",
  },
  explain: {
    title: "Explain",
    message:
      "Now connect your evidence to your answer. Tell why the evidence matters.",
    hint:
      "Try starting with: This shows... or This proves...",
  },
  sum: {
    title: "Sum Up",
    message:
      "Finish with one strong final thought.",
    hint:
      "Try starting with: Overall,... or This is important because...",
  },
};

function isPartComplete(work: StudentWork, part: PartKey) {
  return work[part].trim().length > 0;
}

export default function QuillPanel({ activePart, work }: Props) {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");

  const current = stepHelp[activePart];
  const complete = isPartComplete(work, activePart);

  function giveHint() {
    setResponse(current.hint);
  }

  function explainStep() {
    setResponse(current.message);
  }

  function encourage() {
    setResponse(
      complete
        ? "Nice work. You completed this section. You're ready for the next step."
        : "You're making progress. Take this one sentence at a time."
    );
  }

  return (
    <div style={box}>
      <button onClick={() => setOpen(!open)} style={header}>
        <span>🪶 Quill</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={content}>
          <div style={stepBadge}>
            {complete ? "✅" : "✍️"} Working on: {current.title}
          </div>

          <p style={message}>{current.message}</p>

          {response && <div style={responseBox}>{response}</div>}

          <button onClick={giveHint} style={option}>
            💡 Give me a hint
          </button>

          <button onClick={explainStep} style={option}>
            📚 Explain this step
          </button>

          <button onClick={encourage} style={option}>
            😊 Encourage me
          </button>
        </div>
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

const content = {
  padding: 16,
  borderTop: "1px solid #ddd",
};

const stepBadge = {
  background: "#eef5ec",
  border: "2px solid #6b8f71",
  borderRadius: 999,
  padding: "8px 12px",
  fontSize: 15,
  fontWeight: "bold",
  marginBottom: 12,
};

const message = {
  fontSize: 16,
  lineHeight: 1.5,
  marginTop: 0,
};

const responseBox = {
  background: "#fff8d6",
  border: "2px solid #e0c95c",
  borderRadius: 12,
  padding: 12,
  fontSize: 16,
  lineHeight: 1.5,
  marginBottom: 12,
};

const option = {
  width: "100%",
  padding: 12,
  marginTop: 10,
  borderRadius: 12,
  border: "1px solid #ccc",
  background: "#f9f9f9",
  cursor: "pointer",
  fontSize: 16,
  textAlign: "left" as const,
};