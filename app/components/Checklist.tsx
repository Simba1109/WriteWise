"use client";

import { useState } from "react";

export default function Checklist() {
  const [checks, setChecks] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const items = [
    "I answered the prompt.",
    "I used complete sentences.",
    "I used capitals correctly.",
    "I used ending punctuation.",
    "I reread my writing.",
  ];

  function toggle(index: number) {
    const updated = [...checks];
    updated[index] = !updated[index];
    setChecks(updated);
  }

  return (
    <div
      style={{
        background: "#eef7ff",
        padding: 20,
        borderRadius: 16,
        marginTop: 20,
      }}
    >
      <h2 style={{ marginTop: 0 }}>
        ✅ Writing Checklist
      </h2>

      {items.map((item, index) => (
        <label
          key={item}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 12,
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={checks[index]}
            onChange={() => toggle(index)}
          />

          {item}
        </label>
      ))}
    </div>
  );
}