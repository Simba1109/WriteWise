import { useEffect, useState } from "react";
import LessonCard from "./LessonCard";

type Props = {
  isOpen: boolean;
  isComplete: boolean;
  onClick: () => void;
  vocabularyText: string;
  setVocabularyText: (value: string) => void;
};

export default function VocabularyEditorCard({
  isOpen,
  isComplete,
  onClick,
  vocabularyText,
  setVocabularyText,
}: Props) {
  const [localVocabularyText, setLocalVocabularyText] =
    useState(vocabularyText);

  useEffect(() => {
    setLocalVocabularyText(vocabularyText);
  }, [vocabularyText]);

  return (
    <LessonCard
      title="Step 3: Vocabulary"
      isOpen={isOpen}
      isComplete={isComplete}
      onClick={onClick}
    >
      <textarea
        placeholder="One vocabulary word per line or separated by commas."
        value={localVocabularyText}
        onChange={(e) => {
          setLocalVocabularyText(e.target.value);
          setVocabularyText(e.target.value);
        }}
        style={textarea}
      />
    </LessonCard>
  );
}

const textarea = {
  width: "100%",
  minHeight: 130,
  marginTop: 12,
  padding: 16,
  fontSize: 20,
  borderRadius: 12,
  border: "1px solid #ccc",
};