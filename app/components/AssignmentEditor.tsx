"use client";

import { useEffect, useState } from "react";
import type { Assignment, ReadingSupports } from "../types";

import AssignmentInfoCard from "./AssignmentInfoCard";
import PassageEditorCard from "./PassageEditorCard";
import VocabularyEditorCard from "./VocabularyEditorCard";
import QuoteBankEditorCard from "./QuoteBankEditorCard";
import TeacherHintsEditorCard from "./TeacherHintsEditorCard";
import ReadingSupportsEditorCard from "./ReadingSupportsEditorCard";

type Props = {
  onSaveAssignment: (assignment: Assignment) => void;
  editingAssignment?: Assignment | null;
  onCancelEdit?: () => void;
};

const defaultReadingSupports: ReadingSupports = {
  readPassage: true,
  chunkPassage: true,
  largerText: false,
  dyslexiaFont: false,
  focusMode: false,
  highlightReading: false,
  speechToText: false,
  autoplayPassage: false,
  readingSpeed: "normal",
};

function listToText(items: string[]) {
  return items.join("\n");
}

function splitList(text: string) {
  return text
    .split(/\n|,/)
    .map((x) => x.trim())
    .filter(Boolean);
}

export default function AssignmentEditor({
  onSaveAssignment,
  editingAssignment = null,
  onCancelEdit,
}: Props) {
  const [openCard, setOpenCard] = useState("assignment");

  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [directions, setDirections] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [passage, setPassage] = useState("");
  const [vocabularyText, setVocabularyText] = useState("");
  const [quotesText, setQuotesText] = useState("");
  const [hintsText, setHintsText] = useState("");
  const [readingSupports, setReadingSupports] =
    useState<ReadingSupports>(defaultReadingSupports);

  useEffect(() => {
    if (!editingAssignment) return;

    setTitle(editingAssignment.title);
    setPrompt(editingAssignment.prompt);
    setDirections(editingAssignment.directions);
    setDueDate(editingAssignment.dueDate);
    setPassage(editingAssignment.passage);
    setVocabularyText(listToText(editingAssignment.vocabulary));
    setQuotesText(listToText(editingAssignment.quotes));
    setHintsText(listToText(editingAssignment.hints));
    setReadingSupports(editingAssignment.readingSupports);
    setOpenCard("assignment");
  }, [editingAssignment]);

  function saveAssignment() {
    onSaveAssignment({
      id: editingAssignment ? editingAssignment.id : Date.now().toString(),
      title,
      prompt,
      directions,
      dueDate,
      passage,
      vocabulary: splitList(vocabularyText),
      quotes: splitList(quotesText),
      hints: splitList(hintsText),
      readingSupports,
    });
  }

  return (
    <div>
      <AssignmentInfoCard
        isOpen={openCard === "assignment"}
        isComplete={!!(title && prompt)}
        onClick={() => setOpenCard("assignment")}
        title={title}
        prompt={prompt}
        directions={directions}
        dueDate={dueDate}
        setTitle={setTitle}
        setPrompt={setPrompt}
        setDirections={setDirections}
        setDueDate={setDueDate}
      />

      <PassageEditorCard
        isOpen={openCard === "passage"}
        isComplete={!!passage}
        onClick={() => setOpenCard("passage")}
        passage={passage}
        setPassage={setPassage}
      />

      <VocabularyEditorCard
        isOpen={openCard === "vocabulary"}
        isComplete={!!vocabularyText}
        onClick={() => setOpenCard("vocabulary")}
        vocabularyText={vocabularyText}
        setVocabularyText={setVocabularyText}
      />

      <QuoteBankEditorCard
        isOpen={openCard === "quotes"}
        isComplete={!!quotesText}
        onClick={() => setOpenCard("quotes")}
        quotesText={quotesText}
        setQuotesText={setQuotesText}
      />

      <TeacherHintsEditorCard
        isOpen={openCard === "hints"}
        isComplete={!!hintsText}
        onClick={() => setOpenCard("hints")}
        hintsText={hintsText}
        setHintsText={setHintsText}
      />

      <ReadingSupportsEditorCard
        isOpen={openCard === "supports"}
        onClick={() => setOpenCard("supports")}
        readingSupports={readingSupports}
        setReadingSupports={setReadingSupports}
      />

      <button onClick={saveAssignment} style={saveButton}>
        {editingAssignment ? "💾 Save Changes" : "💾 Save Assignment"}
      </button>

      {editingAssignment && onCancelEdit && (
        <button onClick={onCancelEdit} style={cancelButton}>
          Cancel
        </button>
      )}
    </div>
  );
}

const saveButton = {
  width: "100%",
  marginTop: 24,
  padding: 20,
  borderRadius: 16,
  fontSize: 22,
  cursor: "pointer",
  background: "#6b8f71",
  color: "white",
};

const cancelButton = {
  width: "100%",
  marginTop: 12,
  padding: 18,
  borderRadius: 16,
  fontSize: 20,
  cursor: "pointer",
};