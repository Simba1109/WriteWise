export type QuillPart =
  | "restate"
  | "answer"
  | "cite"
  | "explain"
  | "sum";

export const quillMessages = {
  restate: {
    idle:
      "Restate the prompt in your own words. Save your answer for the next step.",

    started:
      "Nice start. Make sure you're only restating the question.",

    complete:
      "Great. Your restatement is finished. Let's move to your answer.",
  },

  answer: {
    idle:
      "Now answer the question clearly. Tell what you think or learned.",

    started:
      "Good. You're beginning to answer the question.",

    complete:
      "Nice work. Your answer is clear.",
  },

  cite: {
    idle:
      "Now find evidence from the passage that supports your answer.",

    started:
      "You're adding evidence. Choose the strongest example you can find.",

    complete:
      "Excellent. Your evidence supports your thinking.",
  },

  explain: {
    idle:
      "Now explain why your evidence supports your answer.",

    started:
      "You're making the connection. Keep explaining your thinking.",

    complete:
      "Excellent explanation. Your reasoning is becoming stronger.",
  },

  sum: {
    idle:
      "Finish with one strong concluding thought.",

    started:
      "You're wrapping up your paragraph nicely.",

    complete:
      "Excellent finish. Your paragraph is complete.",
  },
};

export function getQuillWritingCoachMessage(
  part: QuillPart,
  text: string
) {
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();
  const wordCount = trimmed
    ? trimmed.split(/\s+/).filter(Boolean).length
    : 0;

  if (!trimmed) {
    return quillMessages[part].idle;
  }

  if (part === "restate") {
    if (wordCount > 30) {
      return "Your restatement is getting long. Keep this part short and save details for your answer.";
    }

    if (
      lower.startsWith("i think") ||
      lower.startsWith("my answer") ||
      lower.includes("because")
    ) {
      return "This sounds like you're starting to answer the prompt. For Restate, focus only on saying the prompt in your own words.";
    }

    return quillMessages.restate.started;
  }

  if (part === "answer") {
    if (wordCount < 4) {
      return "Your answer is a start. Try making it a complete sentence.";
    }

    return quillMessages.answer.started;
  }

  if (part === "cite") {
    if (
      !lower.includes('"') &&
      !lower.includes("the text") &&
      !lower.includes("the passage") &&
      !lower.includes("according to")
    ) {
      return "I don't see clear text evidence yet. Try using a sentence from the passage or begin with 'The text says...'";
    }

    return quillMessages.cite.started;
  }

  if (part === "explain") {
    if (wordCount < 6) {
      return "This explanation is still short. Tell why your evidence proves your answer.";
    }

    if (
      lower.includes('"') ||
      lower.includes("the text says") ||
      lower.includes("according to")
    ) {
      return "This looks like more evidence. In Explain, use your own thinking to show why the evidence matters.";
    }

    return quillMessages.explain.started;
  }

  if (part === "sum") {
    if (wordCount < 5) {
      return "Your ending is started. Try writing one complete final thought.";
    }

    return quillMessages.sum.started;
  }

  return quillMessages[part].started;
}