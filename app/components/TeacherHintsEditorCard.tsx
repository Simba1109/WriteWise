import { useEffect, useState } from "react";
import LessonCard from "./LessonCard";

type Props = {
  isOpen: boolean;
  isComplete: boolean;
  onClick: () => void;
  hintsText: string;
  setHintsText: (value: string) => void;
};

export default function TeacherHintsEditorCard({
  isOpen,
  isComplete,
  onClick,
  hintsText,
  setHintsText,
}: Props) {
  const [localHintsText, setLocalHintsText] = useState(hintsText);

  useEffect(() => {
    setLocalHintsText(hintsText);
  }, [hintsText]);

  return (
    <LessonCard
      title="Step 5: Teacher Hints"
      isOpen={isOpen}
      isComplete={isComplete}
      onClick={onClick}
    >
      <textarea
        placeholder="One helpful hint per line."
        value={localHintsText}
        onChange={(e) => {
          setLocalHintsText(e.target.value);
          setHintsText(e.target.value);
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