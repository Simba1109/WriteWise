export type QuillGoal = {
    id: string;
    title: string;
    completed: boolean;
  };
  
  export function buildGoals(
    restate: string,
    answer: string,
    cite: string,
    explain: string,
    sum: string
  ): QuillGoal[] {
    return [
      {
        id: "restate",
        title: "Complete the Restate section",
        completed: restate.trim().length > 0,
      },
      {
        id: "answer",
        title: "Answer the question clearly",
        completed: answer.trim().length > 0,
      },
      {
        id: "cite",
        title: "Use evidence from the passage",
        completed: cite.trim().length > 0,
      },
      {
        id: "explain",
        title: "Explain why the evidence matters",
        completed: explain.trim().length > 0,
      },
      {
        id: "sum",
        title: "Write a strong conclusion",
        completed: sum.trim().length > 0,
      },
    ];
  }