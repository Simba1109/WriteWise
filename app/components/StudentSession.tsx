"use client";

import { useEffect, useRef } from "react";
import type { StudentSession, StudentWork } from "../types";

type Props = {
  studentName: string;
  assignmentId: string;
  assignmentTitle: string;
  work: StudentWork;
  onLoadSavedWork: (work: StudentWork) => void;
};

function hasAnyWork(work: StudentWork) {
  return (
    work.restate.trim() ||
    work.answer.trim() ||
    work.cite.trim() ||
    work.explain.trim() ||
    work.sum.trim() ||
    work.finalParagraph.trim()
  );
}

export default function StudentSession({
  studentName,
  assignmentId,
  assignmentTitle,
  work,
  onLoadSavedWork,
}: Props) {
  const hasLoaded = useRef(false);
  const storageKey = `writewise-${studentName}-${assignmentId}`;

  useEffect(() => {
    if (!studentName || !assignmentId) return;

    const saved = localStorage.getItem(storageKey);

    if (saved) {
      const session: StudentSession = JSON.parse(saved);
      onLoadSavedWork(session.work);
    }

    hasLoaded.current = true;
  }, [studentName, assignmentId, storageKey, onLoadSavedWork]);

  useEffect(() => {
    if (!studentName || !assignmentId || !hasLoaded.current) return;
    if (!hasAnyWork(work)) return;

    const session: StudentSession = {
      studentName,
      assignmentId,
      assignmentTitle,
      work,
      lastSaved: new Date().toISOString(),
    };

    localStorage.setItem(storageKey, JSON.stringify(session));
  }, [studentName, assignmentId, assignmentTitle, work, storageKey]);

  return null;
}