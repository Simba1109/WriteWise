"use client";

import { useEffect, useState } from "react";
import type { StudentWork } from "../types";
import { quillMessages } from "./quillMessages";

type PartKey = "restate" | "answer" | "cite" | "explain" | "sum";

type Props = {
  activePart: PartKey;
  work: StudentWork;
};

function isComplete(work: StudentWork, part: PartKey) {
  return work[part].trim().length > 0;
}

export default function QuillPanel({
  activePart,
  work,
}: Props) {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");

  const complete = isComplete(work, activePart);

  const current = quillMessages[activePart];

  useEffect(() => {
    if (complete) {
      setResponse(current.complete);
      return;
    }

    if (work[activePart].trim().length > 0) {
      setResponse(current.started);
      return;
    }

    setResponse(current.idle);
  }, [activePart, work]);

  function encourage() {
    setResponse(
      "You're making steady progress. Take your time and keep building one idea at a time."
    );
  }

  function hint() {
    switch (activePart) {
      case "restate":
        setResponse(
          "Try beginning with 'The prompt is asking me to...' and put it into your own words."
        );
        break;

      case "answer":
        setResponse(
          "Answer the question directly before worrying about evidence."
        );
        break;

      case "cite":
        setResponse(
          "Look back through the passage and find one sentence that proves your answer."
        );
        break;

      case "explain":
        setResponse(
          "Tell why your evidence proves your answer. Imagine explaining it to someone else."
        );
        break;

      case "sum":
        setResponse(
          "Finish with one final sentence that wraps everything together."
        );
        break;
    }
  }

  return (
    <div style={box}>
      <button
        onClick={() => setOpen(!open)}
        style={header}
      >
        <span>🪶 Quill</span>

        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={content}>
          <div style={stepBadge}>
            {complete ? "✅" : "✍️"} Working on{" "}
            <strong>
              {activePart.charAt(0).toUpperCase() +
                activePart.slice(1)}
            </strong>
          </div>

          <div style={responseBox}>
            {response}
          </div>

          <button
            onClick={hint}
            style={option}
          >
            💡 Give me a hint
          </button>

          <button
            onClick={encourage}
            style={option}
          >
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