import type { ReadingSupports } from "../types";
import LessonCard from "./LessonCard";

type Props = {
  isOpen: boolean;
  onClick: () => void;
  readingSupports: ReadingSupports;
  setReadingSupports: (value: ReadingSupports) => void;
};

export default function ReadingSupportsEditorCard({
  isOpen,
  onClick,
  readingSupports,
  setReadingSupports,
}: Props) {
  function toggleSupport(key: keyof ReadingSupports) {
    if (key === "readingSpeed") return;

    setReadingSupports({
      ...readingSupports,
      [key]: !readingSupports[key],
    });
  }

  return (
    <LessonCard
      title="Step 6: Reading Supports"
      isOpen={isOpen}
      isComplete={true}
      onClick={onClick}
    >
      {[
        ["readPassage", "Read Passage button"],
        ["chunkPassage", "Chunk Passage"],
        ["largerText", "Larger Text"],
        ["dyslexiaFont", "Dyslexia Font"],
        ["focusMode", "Focus Mode"],
        ["highlightReading", "Highlight While Reading"],
        ["speechToText", "Speech-to-Text"],
        ["autoplayPassage", "Auto-play Passage"],
      ].map(([key, label]) => (
        <label key={key} style={checkLabel}>
          <input
            type="checkbox"
            checked={readingSupports[key as keyof ReadingSupports] as boolean}
            onChange={() => toggleSupport(key as keyof ReadingSupports)}
          />
          {label}
        </label>
      ))}

      <h3>Reading Speed</h3>

      <select
        value={readingSupports.readingSpeed}
        onChange={(e) =>
          setReadingSupports({
            ...readingSupports,
            readingSpeed: e.target.value as "slow" | "normal" | "fast",
          })
        }
        style={input}
      >
        <option value="slow">Slow</option>
        <option value="normal">Normal</option>
        <option value="fast">Fast</option>
      </select>
    </LessonCard>
  );
}

const checkLabel = {
  display: "block",
  fontSize: 20,
  marginTop: 14,
};

const input = {
  width: "100%",
  marginTop: 12,
  padding: 16,
  fontSize: 20,
  borderRadius: 12,
  border: "1px solid #ccc",
};