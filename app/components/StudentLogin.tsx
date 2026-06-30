"use client";

import { useState } from "react";

type Props = {
  onEnter: (firstName: string, lastName: string) => void;
};

export default function StudentLogin({ onEnter }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5efe4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        padding: 32,
      }}
    >
      <section
        style={{
          width: 680,
          background: "white",
          padding: 42,
          borderRadius: 28,
          boxShadow: "0 8px 18px rgba(0,0,0,.12)",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 50, marginBottom: 10 }}>👋 Welcome to WriteWise</h1>

        <p style={{ fontSize: 24 }}>
          Type your first and last name.
        </p>

        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={input}
        />

        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={input}
        />

        <button
          onClick={() => onEnter(firstName, lastName)}
          style={button}
        >
          Continue
        </button>
      </section>
    </main>
  );
}

const input = {
  width: "100%",
  padding: 18,
  fontSize: 24,
  borderRadius: 16,
  marginTop: 18,
  border: "2px solid #ccc",
};

const button = {
  width: "100%",
  padding: 22,
  fontSize: 26,
  borderRadius: 18,
  marginTop: 24,
  background: "#6b8f71",
  color: "white",
  cursor: "pointer",
  border: "none",
};