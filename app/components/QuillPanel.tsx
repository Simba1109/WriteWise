"use client";

import { useEffect, useState } from "react";
import type { StudentWork } from "../types";
import { getQuillWritingCoachMessage } from "./quillMessages";
import type { QuillMemory } from "./quillMemory";
import { getWelcomeMessage } from "./quillWelcome";
import { buildGoals } from "./quillGoals";

type PartKey = "restate" | "answer" | "cite" | "explain" | "sum";

type Props = {
  activePart: PartKey;
  work: StudentWork;
  memory?: QuillMemory;
};

function isComplete(work: StudentWork, part: PartKey) {
  return work[part].trim().length > 0;
}

function reviewSection(part: PartKey, text: string) {
  const trimmed = text.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const lower = trimmed.toLowerCase();

  if (!trimmed) {
    return "This section is still blank. Start with one sentence. You do not need it to be perfect yet.";
  }

  if (part === "restate") {
    if (lower.startsWith("i think") || lower.includes("because")) {
      return "This sounds more like an answer. For Restate, focus only on putting the prompt into your own words.";
    }

    return "This is a good start for Restate. Keep it clear and short.";
  }

  if (part === "answer") {
    if (wordCount < 5) {
      return "Your answer is started. Try making it a complete sentence with a little more detail.";
    }

    return "Your answer is clear. Now make sure your evidence supports it.";
  }

  if (part === "cite") {
    if (
      !lower.includes('"') &&
      !lower.includes("the text") &&
      !lower.includes("the passage") &&
      !lower.includes("according to")
    ) {
      return "I do not see clear text evidence yet. Try using a sentence from the passage or begin with 'The text says...'";
    }

    return "You included evidence. Now explain why that evidence supports your answer.";
  }

  if (part === "explain") {
    if (wordCount < 8) {
      return "Your explanation is still short. Add why the evidence proves your answer.";
    }

    if (
      lower.includes('"') ||
      lower.includes("the text says") ||
      lower.includes("according to")
    ) {
      return "This looks like more evidence. In Explain, use your own thinking to explain why the evidence matters.";
    }

    return "Your explanation is developing. Make sure it clearly connects your evidence to your answer.";
  }

  if (part === "sum") {
    if (wordCount < 6) {
      return "Your conclusion is started. Try ending with one complete final thought.";
    }

    return "This is a strong ending. You wrapped up your paragraph clearly.";
  }

  return "You're making progress. Keep going one step at a time.";
}

export default function QuillPanel({ activePart, work, memory }: Props) {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");

  const complete = isComplete(work, activePart);

  const goals = buildGoals(
    work.restate,
    work.answer,
    work.cite,
    work.explain,
    work.sum
  );

  useEffect(() => {
    if (memory) {
      setResponse(getWelcomeMessage(memory));
    } else {
      setResponse(getQuillWritingCoachMessage(activePart, work[activePart]));
    }
  }, []);

  useEffect(() => {
    setResponse(getQuillWritingCoachMessage(activePart, work[activePart]));
  }, [activePart, work]);

  function welcome() {
    if (memory) {
      setResponse(getWelcomeMessage(memory));
    }
  }

  function coach() {
    setResponse(getQuillWritingCoachMessage(activePart, work[activePart]));
  }

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

  function stuckStarting() {
    setResponse(
      "Start with one sentence. It does not have to be perfect. Strong writers revise after they get ideas on the page."
    );
  }

  function explainCurrentStep() {
    setResponse(getQuillWritingCoachMessage(activePart, work[activePart]));
  }

  function findEvidence() {
    setResponse(
      "Look back at the passage and find one sentence that proves your answer. Evidence should come from the text, not just your opinion."
    );
  }

  function reviewCurrentSection() {
    setResponse(reviewSection(activePart, work[activePart]));
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

          <div style={goalsBox}>
            <h3 style={goalsTitle}>🎯 Today's Goals</h3>

            {goals.map((goal) => (
              <div key={goal.id} style={goalRow}>
                <span>{goal.completed ? "✅" : "⬜"}</span>
                <span>{goal.title}</span>
              </div>
            ))}
          </div>

          <div style={conversationBox}>
            <h3 style={conversationTitle}>What do you need help with?</h3>

            <button onClick={stuckStarting} style={option}>
              ✍️ I'm stuck getting started
            </button>

            <button onClick={explainCurrentStep} style={option}>
              📚 I do not understand this step
            </button>

            <button onClick={findEvidence} style={option}>
              🔍 Help me find evidence
            </button>

            <button onClick={reviewCurrentSection} style={option}>
              🪞 Review this section
            </button>
          </div>

          <button onClick={welcome} style={option}>
            👋 Welcome back
          </button>

          <button onClick={coach} style={option}>
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

const goalsBox = {
  background: "#f9f9f9",
  border: "1px solid #ddd",
  borderRadius: 12,
  padding: 12,
  marginBottom: 12,
};

const goalsTitle = {
  margin: "0 0 10px",
  fontSize: 17,
};

const goalRow = {
  display: "flex",
  gap: 8,
  alignItems: "center",
  fontSize: 15,
  marginTop: 8,
};

const conversationBox = {
  background: "#f7f3ea",
  border: "1px solid #d8c8a8",
  borderRadius: 12,
  padding: 12,
  marginBottom: 12,
};

const conversationTitle = {
  margin: "0 0 10px",
  fontSize: 17,
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