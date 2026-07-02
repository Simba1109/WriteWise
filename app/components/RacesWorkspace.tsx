"use client";

import { useEffect, useState } from "react";
import type { StudentWork } from "../types";
import { blankStudentWork, cleanStudentWork } from "../writewiseStore";
import RacesCard from "./RacesCard";

type PartKey = "restate" | "answer" | "cite" | "explain" | "sum";

type Props = {
  prompt: string;
  setWriting: (text: string) => void;
  onWorkChange?: (work: StudentWork) => void;
  onActivePartChange?: (part: PartKey) => void;
  savedWork?: StudentWork | null;
  vocabulary?: string[];
  quotes?: string[];
  hints?: string[];
};

const sections = [
  {
    key: "restate" as PartKey,
    letter: "R",
    title: "Restate",
    subtitle: "Say the prompt in your own words.",
    color: "#d8ecff",
    dark: "#1f5f8b",
    starters: [
      "The prompt is asking me to...",
      "This question is about...",
      "I will explain...",
    ],
  },
  {
    key: "answer" as PartKey,
    letter: "A",
    title: "Answer",
    subtitle: "Give your clear answer.",
    color: "#dcf5df",
    dark: "#2f6f3a",
    starters: ["My answer is...", "I think...", "One important idea is..."],
  },
  {
    key: "cite" as PartKey,
    letter: "C",
    title: "Cite Evidence",
    subtitle: "Use proof from the text.",
    color: "#fff1b8",
    dark: "#9a7414",
    starters: [
      "One example is...",
      "The text says...",
      "According to the passage...",
    ],
  },
  {
    key: "explain" as PartKey,
    letter: "E",
    title: "Explain",
    subtitle: "Tell how the evidence proves your answer.",
    color: "#eadcff",
    dark: "#6b4bb8",
    starters: ["This shows...", "This means...", "This proves..."],
  },
  {
    key: "sum" as PartKey,
    letter: "S",
    title: "Sum Up",
    subtitle: "End with a final thought.",
    color: "#ffdcdc",
    dark: "#a94444",
    starters: [
      "Overall,...",
      "In conclusion,...",
      "This is important because...",
    ],
  },
];

export default function RacesWorkspace({
  prompt,
  setWriting,
  onWorkChange,
  onActivePartChange,
  savedWork,
  vocabulary = [],
  quotes = [],
  hints = [],
}: Props) {
  const [open, setOpen] = useState<PartKey>("restate");
  const [work, setWork] = useState<StudentWork>(blankStudentWork);

  useEffect(() => {
    const loadedWork = savedWork
      ? cleanStudentWork(savedWork)
      : blankStudentWork;

    setWork(loadedWork);
    setWriting(loadedWork.finalParagraph);
  }, [savedWork, setWriting]);

  function activatePart(part: PartKey) {
    setOpen(part);

    if (onActivePartChange) {
      onActivePartChange(part);
    }
  }

  function buildParagraph(updated: StudentWork) {
    return `${updated.restate} ${updated.answer} ${updated.cite} ${updated.explain} ${updated.sum}`.trim();
  }

  function saveUpdatedWork(updatedWork: StudentWork) {
    const cleaned = cleanStudentWork(updatedWork);

    setWork(cleaned);
    setWriting(cleaned.finalParagraph);

    if (onWorkChange) {
      onWorkChange(cleaned);
    }
  }

  function update(part: PartKey, value: string) {
    activatePart(part);

    const updated = {
      ...work,
      [part]: value,
    };

    saveUpdatedWork({
      ...updated,
      finalParagraph: buildParagraph(updated),
    });
  }

  function requestHelp() {
    saveUpdatedWork({
      ...work,
      needsHelp: true,
      helpMessage: "Student requested help.",
    });
  }

  function clearHelp() {
    saveUpdatedWork({
      ...work,
      needsHelp: false,
      helpMessage: "",
    });
  }

  function markFeedbackSeen() {
    saveUpdatedWork({
      ...work,
      feedbackSeen: true,
    });
  }

  return (
    <div>
      <div style={promptBox}>
        <h2 style={{ marginTop: 0, fontSize: 30 }}>
          📝 Today's Writing Challenge
        </h2>

        <p style={{ fontSize: 23, lineHeight: 1.5 }}>{prompt}</p>

        <div style={goalBox}>
          ⭐ Goal: Use every part of R.A.C.E.S. to build one strong paragraph.
        </div>

        <div style={helpBox}>
          {work.needsHelp ? (
            <>
              <div style={helpSent}>🆘 Help request sent to teacher.</div>

              <button onClick={clearHelp} style={helpButton}>
                I do not need help anymore
              </button>
            </>
          ) : (
            <button onClick={requestHelp} style={helpButton}>
              🆘 I Need Help
            </button>
          )}
        </div>

        {work.teacherFeedback && work.teacherFeedback.trim().length > 0 && (
          <div style={feedbackBox}>
            <h3 style={{ marginTop: 0 }}>
              {work.feedbackSeen === false
                ? "💬 New Teacher Feedback"
                : "💬 Teacher Feedback"}
            </h3>

            <p style={{ fontSize: 20, lineHeight: 1.5 }}>
              {work.teacherFeedback}
            </p>

            {work.feedbackSeen === false && (
              <button onClick={markFeedbackSeen} style={feedbackButton}>
                I read this feedback
              </button>
            )}
          </div>
        )}
      </div>

      {sections.map((section) => (
        <RacesCard
          key={section.key}
          partKey={section.key}
          letter={section.letter}
          title={section.title}
          subtitle={section.subtitle}
          color={section.color}
          dark={section.dark}
          starters={section.starters}
          vocabulary={vocabulary}
          quotes={quotes}
          hints={hints}
          isOpen={open === section.key}
          completed={work[section.key].trim().length > 0}
          value={work[section.key]}
          onOpen={() => activatePart(section.key)}
          onChange={update}
        />
      ))}
    </div>
  );
}

const promptBox = {
  background: "#fff4cf",
  border: "5px solid #b58b2a",
  borderRadius: 28,
  padding: 28,
  marginBottom: 24,
  boxShadow: "0 8px 18px rgba(0,0,0,.12)",
};

const goalBox = {
  background: "white",
  padding: 16,
  borderRadius: 16,
  fontSize: 20,
  marginTop: 18,
};

const helpBox = {
  background: "#ffe0e0",
  border: "4px solid #d9534f",
  borderRadius: 16,
  padding: 18,
  marginTop: 20,
};

const helpSent = {
  fontSize: 22,
  fontWeight: "bold",
  marginBottom: 10,
};

const helpButton = {
  width: "100%",
  padding: 18,
  borderRadius: 14,
  fontSize: 22,
  cursor: "pointer",
  fontWeight: "bold",
};

const feedbackBox = {
  background: "#eef5ec",
  border: "3px solid #6b8f71",
  borderRadius: 16,
  padding: 18,
  marginTop: 20,
};

const feedbackButton = {
  width: "100%",
  padding: 16,
  borderRadius: 14,
  fontSize: 20,
  cursor: "pointer",
};