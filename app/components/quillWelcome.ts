import type { QuillMemory } from "./quillMemory";

export function getWelcomeMessage(memory: QuillMemory): string {
  if (memory.completedAssignments === 0) {
    return (
      "Welcome! I'm Quill, your Writing Mentor. We'll build your writing one step at a time."
    );
  }

  if (memory.completedAssignments === 1) {
    return (
      "Welcome back! You've already completed your first writing assignment. Let's keep building your confidence."
    );
  }

  if (memory.completedAssignments < 5) {
    return (
      `Welcome back! You've completed ${memory.completedAssignments} writing assignments. I'm already seeing steady progress.`
    );
  }

  if (memory.completedAssignments < 10) {
    return (
      `Welcome back! ${memory.completedAssignments} completed assignments is something to be proud of. Let's keep growing as a writer.`
    );
  }

  if (memory.helpRequests === 0) {
    return (
      "Welcome back! I noticed you've been working independently. Keep trusting your thinking."
    );
  }

  if (memory.teacherFeedbackRead > 0) {
    return (
      "Welcome back! Thanks for taking time to read your teacher's feedback. Great writers learn from feedback."
    );
  }

  return (
    `Welcome back! You've completed ${memory.completedAssignments} assignments. I'm excited to help you with today's writing.`
  );
}