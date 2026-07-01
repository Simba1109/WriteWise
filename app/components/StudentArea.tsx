"use client";

import { useState } from "react";
import type { Assignment, StudentWork } from "../types";
import {
  blankStudentWork,
  loadStudentWork,
  saveStudentWork as saveWorkToStore,
} from "../writewiseStore";
import WelcomeCard from "./WelcomeCard";
import AudioDirections from "./AudioDirections";
import ProgressTracker from "./ProgressTracker";
import ReplayWriting from "./ReplayWriting";
import RevisionMode from "./RevisionMode";
import Checklist from "./Checklist";
import RacesWorkspace from "./RacesWorkspace";
import FinalParagraphBox from "./FinalParagraphBox";
import SaveStatus from "./SaveStatus";
import ReadingPassage from "./ReadingPassage";
import StudentTools from "./StudentTools";
import ToolSection from "./ToolSection";
import StudentAssignmentLibrary from "./StudentAssignmentLibrary";

type Props = {
  studentName: string;
  assignments: Assignment[];
  onBack: () => void;
};

export default function StudentArea({
  studentName,
  assignments,
  onBack,
}: Props) {
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const [writing, setWriting] = useState("");
  const [savedWork, setSavedWork] = useState<StudentWork>(blankStudentWork);

  function openAssignment(assignment: Assignment) {
    const work = loadStudentWork(studentName, assignment.id);

    setSavedWork(work);
    setWriting(work.finalParagraph);
    setSelectedAssignment(assignment);
  }

  function saveStudentWork(work: StudentWork) {
    if (!selectedAssignment) return;

    saveWorkToStore(studentName, selectedAssignment.id, work);
    setSavedWork(work);
    setWriting(work.finalParagraph);
  }

  if (!selectedAssignment) {
    return (
      <main style={page}>
        <button style={backButton} onClick={onBack}>
          ← Home
        </button>

        <section style={card}>
          <StudentAssignmentLibrary
            studentName={studentName}
            assignments={assignments}
            onOpen={openAssignment}
          />
        </section>
      </main>
    );
  }

  return (
    <main style={page}>
      <button style={backButton} onClick={onBack}>
        ← Home
      </button>

      <section style={card}>
        <WelcomeCard studentName={studentName} writing={writing} />

        <div style={grid}>
          <div>
            <StudentTools>
              <ToolSection title="🎧 Directions">
                <AudioDirections text={selectedAssignment.directions} />
              </ToolSection>

              <ToolSection title="📈 My Progress">
                <ProgressTracker writing={writing} />
                <SaveStatus writing={writing} />
              </ToolSection>

              <ToolSection title="✅ Writing Checklist">
                <Checklist />
              </ToolSection>

              <ToolSection title="🔁 Replay My Writing">
                <ReplayWriting writing={writing} />
              </ToolSection>

              <ToolSection title="✨ Revision Coach">
                <RevisionMode writing={writing} />
              </ToolSection>
            </StudentTools>
          </div>

          <div>
            <button
              onClick={() => setSelectedAssignment(null)}
              style={smallButton}
            >
              ← Back to Assignments
            </button>

            <h2>{selectedAssignment.title}</h2>

            <ReadingPassage
              passage={selectedAssignment.passage}
              supports={selectedAssignment.readingSupports}
            />

            <RacesWorkspace
              key={`${selectedAssignment.id}-${savedWork.teacherFeedback}-${savedWork.feedbackSeen}`}
              prompt={selectedAssignment.prompt}
              vocabulary={selectedAssignment.vocabulary}
              quotes={selectedAssignment.quotes}
              hints={selectedAssignment.hints}
              savedWork={savedWork}
              onWorkChange={saveStudentWork}
              setWriting={setWriting}
            />

            <FinalParagraphBox writing={writing} />
          </div>
        </div>
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

const card = {
  maxWidth: 1250,
  margin: "20px auto",
  background: "white",
  padding: 36,
  borderRadius: 24,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "320px 1fr",
  gap: 24,
  marginTop: 20,
};

const backButton = {
  padding: 14,
  borderRadius: 12,
  cursor: "pointer",
};

const smallButton = {
  padding: 12,
  borderRadius: 12,
  cursor: "pointer",
  marginBottom: 12,
};