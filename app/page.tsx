"use client";

import { useEffect, useState } from "react";
import type { Assignment } from "./types";
import StudentLogin from "./components/StudentLogin";
import StudentArea from "./components/StudentArea";
import TeacherWorkspace from "./components/TeacherWorkspace";

const defaultAssignment: Assignment = {
  id: "default-races-practice",
  title: "R.A.C.E.S. Practice",
  prompt: "Write about a time you kept trying even when something was difficult.",
  directions: "Build one strong R.A.C.E.S. paragraph.",
  dueDate: "",
  passage: "",
  vocabulary: [],
  quotes: [],
  hints: [],
  readingSupports: {
    readPassage: true,
    chunkPassage: true,
    largerText: false,
    dyslexiaFont: false,
    focusMode: false,
    highlightReading: false,
    speechToText: false,
    autoplayPassage: false,
    readingSpeed: "normal",
  },
};

export default function Home() {
  const [screen, setScreen] = useState<
    "home" | "studentLogin" | "student" | "teacher"
  >("home");

  const [studentName, setStudentName] = useState("");

  const [assignments, setAssignments] = useState<Assignment[]>([
    defaultAssignment,
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("writewise-assignments");

    if (saved) {
      const stored: Assignment[] = JSON.parse(saved);

      setAssignments([defaultAssignment, ...stored]);
    }
  }, []);

  if (screen === "studentLogin") {
    return (
      <StudentLogin
        onEnter={(firstName, lastName) => {
          setStudentName(`${firstName} ${lastName}`.trim());
          setScreen("student");
        }}
      />
    );
  }

  if (screen === "student") {
    return (
      <StudentArea
        studentName={studentName}
        assignments={assignments}
        onBack={() => setScreen("home")}
      />
    );
  }

  if (screen === "teacher") {
    return (
      <TeacherWorkspace
        assignments={assignments}
        onBack={() => setScreen("home")}
        onPublishAssignment={(assignment) => {
          const saved = localStorage.getItem("writewise-assignments");

          const stored: Assignment[] = saved ? JSON.parse(saved) : [];

          setAssignments([defaultAssignment, ...stored]);

          alert("Assignment published!");
        }}
      />
    );
  }

  return (
    <main style={homePage}>
      <section style={homeCard}>
        <h1 style={title}>WriteWise</h1>

        <p style={subtitle}>
          A Calm Writing Space for Students
        </p>

        <button
          style={studentButton}
          onClick={() => setScreen("studentLogin")}
        >
          I am a Student
        </button>

        <button
          style={teacherButton}
          onClick={() => setScreen("teacher")}
        >
          I am a Teacher
        </button>
      </section>
    </main>
  );
}

const page = {
  minHeight: "100vh",
  background: "#f5efe4",
  padding: 32,
  fontFamily: "Arial",
};

const homePage = {
  ...page,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const homeCard = {
  background: "white",
  padding: 50,
  width: 760,
  borderRadius: 24,
  textAlign: "center" as const,
};

const title = {
  fontSize: 64,
};

const subtitle = {
  fontSize: 24,
};

const button = {
  width: "100%",
  marginTop: 20,
  padding: 20,
  borderRadius: 16,
  fontSize: 22,
  cursor: "pointer",
};

const studentButton = {
  ...button,
  background: "#6b8f71",
  color: "white",
};

const teacherButton = {
  ...button,
  background: "#8b6f47",
  color: "white",
};