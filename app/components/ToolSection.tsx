"use client";

import { useState } from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function ToolSection({ title, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 14,
        marginBottom: 12,
        overflow: "hidden",
        background: "white",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: 14,
          fontSize: 18,
          fontWeight: "bold",
          border: "none",
          background: "#f7f7f7",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {title}
        <span style={{ float: "right" }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && <div style={{ padding: 14 }}>{children}</div>}
    </div>
  );
}