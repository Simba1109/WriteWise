"use client";

import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function StudentTools({ children }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div
      style={{
        background: "white",
        borderRadius: 20,
        overflow: "hidden",
        border: "2px solid #ddd",
        marginBottom: 20,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: 18,
          fontSize: 24,
          fontWeight: "bold",
          cursor: "pointer",
          border: "none",
          background: "#eef5ec",
          textAlign: "left",
        }}
      >
        🧰 Student Tools
        <span style={{ float: "right" }}>
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div
          style={{
            padding: 20,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}