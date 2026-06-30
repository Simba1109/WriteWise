"use client";

import { useState } from "react";

type Props = {
  writing: string;
};

export default function RevisionMode({ writing }: Props) {
  const [showRevision, setShowRevision] = useState(false);

  const wordCount = writing.trim() ? writing.trim().split(/\s+/).length : 0;

  const sentenceCount = writing
    .split(/[.!?]/)
    .filter((sentence) => sentence.trim().length > 0).length;

  return (
    <div
      style={{
        background: "#fff1f2",
        padding: 20,
        borderRadius: 16,
        marginTop: 20,
      }}
    >
      <h2 style={{ marginTop: 0 }}>📝 Revision Mode</h2>

      <p style={{ fontSize: 18 }}>Words: {wordCount}</p>
      <p style={{ fontSize: 18 }}>Sentences: {sentenceCount}</p>

      <button
        onClick={() => setShowRevision(!showRevision)}
        style={{
          width: "100%",
          padding: 14,
          borderRadius: 12,
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        Start Revising
      </button>

      {showRevision && (
        <div
          style={{
            marginTop: 16,
            background: "white",
            padding: 16,
            borderRadius: 12,
            fontSize: 18,
          }}
        >
          <p>✅ Check that your paragraph has a beginning, middle, and ending.</p>
          <p>✅ Add one detail to explain your idea.</p>
          <p>✅ Fix capitals, periods, and spelling.</p>
        </div>
      )}
    </div>
  );
}