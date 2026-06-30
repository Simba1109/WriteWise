"use client";

import type { StudentWork } from "../types";
import TeacherReviewCard from "./TeacherReviewCard";

type Props = {
  studentName: string;
  assignmentTitle: string;
  work: StudentWork;
};

export default function TeacherReviewCenter({
  studentName,
  assignmentTitle,
  work,
}: Props) {
  const completedParts = [
    work.restate,
    work.answer,
    work.cite,
    work.explain,
    work.sum,
  ].filter((part) => part.trim().length > 0).length;

  return (
    <div
      style={{
        background: "#f5efe4",
        minHeight: "100vh",
        padding: 32,
        fontFamily: "Arial",
      }}
    >
      <section
        style={{
          maxWidth: 900,
          margin: "20px auto",
          background: "white",
          padding: 32,
          borderRadius: 24,
        }}
      >
        <h1>Teacher Review Center</h1>

        <h2>{studentName || "Student"}</h2>
        <p style={{ fontSize: 20 }}>{assignmentTitle}</p>

        <div
          style={{
            background: "#eef5ec",
            padding: 18,
            borderRadius: 16,
            fontSize: 20,
            marginBottom: 24,
          }}
        >
          Progress: {completedParts} of 5 R.A.C.E.S. sections completed
        </div>

        <TeacherReviewCard title="R - Restate" value={work.restate} />
        <TeacherReviewCard title="A - Answer" value={work.answer} />
        <TeacherReviewCard title="C - Cite Evidence" value={work.cite} />
        <TeacherReviewCard title="E - Explain" value={work.explain} />
        <TeacherReviewCard title="S - Sum Up" value={work.sum} />

        <TeacherReviewCard
          title="Final Paragraph"
          value={work.finalParagraph}
        />
      </section>
    </div>
  );
}