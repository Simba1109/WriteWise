"use client";

import { useState } from "react";

export default function SentenceStarter() {
  const [selected, setSelected] = useState("");

  const starters = {
    "R - Restate": [
      "The prompt is asking me to explain...",
      "This question is about...",
      "I will write about...",
    ],
    "A - Answer": [
      "My answer is...",
      "I think...",
      "One important idea is...",
    ],
    "C - Cite Evidence": [
      "One example from the text is...",
      "The text says...",
      "According to the passage...",
    ],
    "E - Explain": [
      "This shows...",
      "This means...",
      "This proves...",
    ],
    "S - Sum Up": [
      "Overall,...",
      "In conclusion,...",
      "This is important because...",
    ],
  };

  const currentStarters =
    selected && starters[selected as keyof typeof starters]
      ? starters[selected as keyof typeof starters]
      : [];

  return (
    <div style={{ background: "#eef5ec", padding: 20, borderRadius: 16, marginTop: 20 }}>
      <h2 style={{ marginTop: 0 }}>💡 Sentence Starters</h2>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          fontSize: 18,
          borderRadius: 12,
          marginBottom: 12,
        }}
      >
        <option value="">Choose R.A.C.E.S. part</option>
        {Object.keys(starters).map((part) => (
          <option key={part} value={part}>
            {part}
          </option>
        ))}
      </select>

      {currentStarters.map((starter) => (
        <button
          key={starter}
          style={{
            width: "100%",
            textAlign: "left",
            padding: 12,
            marginTop: 10,
            borderRadius: 12,
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          {starter}
        </button>
      ))}
    </div>
  );
}