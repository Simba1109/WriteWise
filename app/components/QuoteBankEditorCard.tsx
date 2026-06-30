import { useEffect, useState } from "react";
import LessonCard from "./LessonCard";

type Props = {
  isOpen: boolean;
  isComplete: boolean;
  onClick: () => void;
  quotesText: string;
  setQuotesText: (value: string) => void;
};

export default function QuoteBankEditorCard({
  isOpen,
  isComplete,
  onClick,
  quotesText,
  setQuotesText,
}: Props) {
  const [localQuotesText, setLocalQuotesText] = useState(quotesText);

  useEffect(() => {
    setLocalQuotesText(quotesText);
  }, [quotesText]);

  return (
    <LessonCard
      title="Step 4: Quote Bank"
      isOpen={isOpen}
      isComplete={isComplete}
      onClick={onClick}
    >
      <textarea
        placeholder="One evidence quote per line."
        value={localQuotesText}
        onChange={(e) => {
          setLocalQuotesText(e.target.value);
          setQuotesText(e.target.value);
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