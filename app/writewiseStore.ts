import type { StudentWork } from "./types";

export const blankStudentWork: StudentWork = {
  restate: "",
  answer: "",
  cite: "",
  explain: "",
  sum: "",
  finalParagraph: "",
  needsHelp: false,
  helpMessage: "",
  teacherFeedback: "",
  feedbackSeen: true,
};

export function cleanStudentWork(work: StudentWork): StudentWork {
  return {
    ...blankStudentWork,
    ...work,
  };
}

export function getStudentWorkKey(studentName: string, assignmentId: string) {
  return `writewise-work-${studentName.trim().toLowerCase()}-${assignmentId}`;
}

export function loadStudentWork(
  studentName: string,
  assignmentId: string
): StudentWork {
  const key = getStudentWorkKey(studentName, assignmentId);
  const saved = localStorage.getItem(key);

  if (!saved) return blankStudentWork;

  try {
    return cleanStudentWork(JSON.parse(saved));
  } catch {
    return blankStudentWork;
  }
}

export function saveStudentWork(
  studentName: string,
  assignmentId: string,
  work: StudentWork
) {
  const key = getStudentWorkKey(studentName, assignmentId);
  localStorage.setItem(key, JSON.stringify(cleanStudentWork(work)));
}