import { useEffect, useState } from "react";
import LessonCard from "./LessonCard";

type Props = {
  isOpen: boolean;
  isComplete: boolean;
  onClick: () => void;
  title: string;
  prompt: string;
  directions: string;
  dueDate: string;
  setTitle: (value: string) => void;
  setPrompt: (value: string) => void;
  setDirections: (value: string) => void;
  setDueDate: (value: string) => void;
};

export default function AssignmentInfoCard({
  isOpen,
  isComplete,
  onClick,
  title,
  prompt,
  directions,
  dueDate,
  setTitle,
  setPrompt,
  setDirections,
  setDueDate,
}: Props) {
  const [localTitle, setLocalTitle] = useState(title);
  const [localPrompt, setLocalPrompt] = useState(prompt);
  const [localDirections, setLocalDirections] = useState(directions);
  const [localDueDate, setLocalDueDate] = useState(dueDate);

  useEffect(() => setLocalTitle(title), [title]);
  useEffect(() => setLocalPrompt(prompt), [prompt]);
  useEffect(() => setLocalDirections(directions), [directions]);
  useEffect(() => setLocalDueDate(dueDate), [dueDate]);

  return (
    <LessonCard
      title="Step 1: Assignment Information"
      isOpen={isOpen}
      isComplete={isComplete}
      onClick={onClick}
    >
      <input
        placeholder="Assignment title"
        value={localTitle}
        onChange={(e) => {
          setLocalTitle(e.target.value);
          setTitle(e.target.value);
        }}
        style={input}
      />

      <textarea
        placeholder="Writing prompt"
        value={localPrompt}
        onChange={(e) => {
          setLocalPrompt(e.target.value);
          setPrompt(e.target.value);
        }}
        style={textarea}
      />

      <textarea
        placeholder="Student directions"
        value={localDirections}
        onChange={(e) => {
          setLocalDirections(e.target.value);
          setDirections(e.target.value);
        }}
        style={textarea}
      />

      <input
        type="date"
        value={localDueDate}
        onChange={(e) => {
          setLocalDueDate(e.target.value);
          setDueDate(e.target.value);
        }}
        style={input}
      />
    </LessonCard>
  );
}

const input = {
  width: "100%",
  marginTop: 12,
  padding: 16,
  fontSize: 20,
  borderRadius: 12,
  border: "1px solid #ccc",
};

const textarea = {
  width: "100%",
  minHeight: 130,
  marginTop: 12,
  padding: 16,
  fontSize: 20,
  borderRadius: 12,
  border: "1px solid #ccc",
};