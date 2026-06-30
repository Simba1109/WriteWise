"use client";

import { useEffect, useState } from "react";
import type { StudentWork } from "../types";
import RacesCard from "./RacesCard";

type Props = {
  prompt: string;
  setWriting: (text: string) => void;
  onWorkChange?: (work: StudentWork) => void;
  savedWork?: StudentWork | null;
  vocabulary?: string[];
  quotes?: string[];
  hints?: string[];
};

type PartKey = "restate" | "answer" | "cite" | "explain" | "sum";

const sections = [
  {
    key: "restate" as PartKey,
    letter: "R",
    title: "Restate",
    subtitle: "Say the prompt in your own words.",
    color: "#d8ecff",
    dark: "#1f5f8b",
    starters: ["The prompt is asking me to...", "This question is about...", "I will explain..."],
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
    starters: ["One example is...", "The text says...", "According to the passage..."],
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
    starters: ["Overall,...", "In conclusion,...", "This is important because..."],
  },
];

const blankWork: StudentWork = {
  restate: "",
  answer: "",
  cite: "",
  explain: "",
  sum: "",
  finalParagraph: "",
};

export default function RacesWorkspace({
  prompt,
  setWriting,
  onWorkChange,
  savedWork,
  vocabulary = [],
  quotes = [],
  hints = [],
}: Props) {
  const [open, setOpen] = useState<PartKey>("restate");
  const [work, setWork] = useState<StudentWork>(blankWork);

  useEffect(() => {
    if (savedWork) {
      setWork(savedWork);
      setWriting(savedWork.finalParagraph);
    }
  }, [savedWork, setWriting]);

  function buildParagraph(updated: StudentWork) {
    return `${updated.restate} ${updated.answer} ${updated.cite} ${updated.explain} ${updated.sum}`.trim();
  }

  function update(part: PartKey, value: string) {
    const updated = {
      ...work,
      [part]: value,
    };

    const finalParagraph = buildParagraph(updated);

    const updatedWork = {
      ...updated,
      finalParagraph,
    };

    setWork(updatedWork);
    setWriting(finalParagraph);

    if (onWorkChange) {
      onWorkChange(updatedWork);
    }
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
          onOpen={() => setOpen(section.key)}
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
  marginBottom: 32,
  boxShadow: "0 8px 18px rgba(0,0,0,.12)",
};

const goalBox = {
  background: "white",
  padding: 16,
  borderRadius: 16,
  fontSize: 20,
  marginTop: 18,
};