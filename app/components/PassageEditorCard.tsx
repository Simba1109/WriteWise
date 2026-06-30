import { useEffect, useState } from "react";
import LessonCard from "./LessonCard";

type Props = {
  isOpen: boolean;
  isComplete: boolean;
  onClick: () => void;
  passage: string;
  setPassage: (value: string) => void;
};

export default function PassageEditorCard({
  isOpen,
  isComplete,
  onClick,
  passage,
  setPassage,
}: Props) {
  const [localPassage, setLocalPassage] = useState(passage);

  useEffect(() => {
    setLocalPassage(passage);
  }, [passage]);

  return (
    <LessonCard
      title="Step 2: Reading Passage"
      isOpen={isOpen}
      isComplete={isComplete}
      onClick={onClick}
    >
      <textarea
        placeholder="Paste reading passage here..."
        value={localPassage}
        onChange={(e) => {
          setLocalPassage(e.target.value);
          setPassage(e.target.value);
        }}
        style={textarea}
      />
    </LessonCard>
  );
}

const textarea = {
  width: "100%",
  minHeight: 220,
  marginTop: 12,
  padding: 16,
  fontSize: 20,
  borderRadius: 12,
  border: "1px solid #ccc",
};