import type { StudentWork } from "../types";

export type QuillMemory = {
  completedAssignments: number;
  helpRequests: number;
  teacherFeedbackRead: number;
  averageWords: number;
};

export function buildQuillMemory(
  allWork: StudentWork[]
): QuillMemory {
  const completedAssignments = allWork.filter(
    (w) =>
      w.restate &&
      w.answer &&
      w.cite &&
      w.explain &&
      w.sum
  ).length;

  const helpRequests = allWork.filter(
    (w) => w.needsHelp
  ).length;

  const teacherFeedbackRead = allWork.filter(
    (w) => w.feedbackSeen
  ).length;

  const totalWords = allWork.reduce((total, work) => {
    const words = work.finalParagraph
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    return total + words;
  }, 0);

  return {
    completedAssignments,
    helpRequests,
    teacherFeedbackRead,
    averageWords:
      allWork.length === 0
        ? 0
        : Math.round(totalWords / allWork.length),
  };
}