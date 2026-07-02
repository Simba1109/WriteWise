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