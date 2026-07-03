"use client";

import { useEffect, useState } from "react";
import type { StudentWork } from "../types";
import { getQuillWritingCoachMessage } from "./quillMessages";
import type { QuillMemory } from "./quillMemory";

type PartKey = "restate" | "answer" | "cite" | "explain" | "sum";

type Props = {
  activePart: PartKey;
  work: StudentWork;
  memory?: QuillMemory;
};

function isComplete(work: StudentWork, part: PartKey) {
  return work[part].trim().length > 0;
}

export default function QuillPanel({ activePart, work, memory }: Props) {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");

  const complete = isComplete(work, activePart);

  useEffect(() => {
    setResponse(getQuillWritingCoachMessage(activePart, work[activePart]));
  }, [activePart, work]);

  function encourage() {
    if (memory && memory.completedAssignments >= 3) {
      setResponse(
        `You've completed ${memory.completedAssignments} assignments. That shows real progress. Keep building one section at a time.`
      );
      return;
    }

    if (complete) {
      setResponse(
        "Nice work. You completed this section. You're ready for the next step."
      );
      return;
    }

    setResponse(
      "You're making steady progress. Take your time and keep building one idea at a time."
    );
  }

  function hint() {
    setResponse(getQuillWritingCoachMessage(activePart, work[activePart]));
  }

  return (
    <div style={box}>
      <button onClick={() => setOpen(!open)} style={header}>
        <span>🪶 Quill</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={content}>
          {memory && memory.completedAssignments > 0 && (
            <div style={memoryBox}>
              Progress remembered: {memory.completedAssignments} assignment
              {memory.completedAssignments === 1 ? "" : "s"} completed
            </div>
          )}

          <div style={stepBadge}>
            {complete ? "✅" : "✍️"} Working on{" "}
            <strong>
              {activePart.charAt(0).toUpperCase() + activePart.slice(1)}
            </strong>
          </div>

          <div style={responseBox}>{response}</div>

          <button onClick={hint} style={option}>
            💡 Coach me
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

const memoryBox = {
  background: "#eef5ec",
  border: "2px solid #6b8f71",
  borderRadius: 12,
  padding: 10,
  fontSize: 14,
  fontWeight: "bold",
  marginBottom: 12,
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