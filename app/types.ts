export type ReadingSupports = {
  readPassage: boolean;
  chunkPassage: boolean;
  largerText: boolean;
  dyslexiaFont: boolean;
  focusMode: boolean;
  highlightReading: boolean;
  speechToText: boolean;
  autoplayPassage: boolean;
  readingSpeed: "slow" | "normal" | "fast";
};

export type Assignment = {
  id: string;
  title: string;
  prompt: string;
  directions: string;
  dueDate: string;
  passage: string;
  vocabulary: string[];
  quotes: string[];
  hints: string[];
  readingSupports: ReadingSupports;
  isPublished?: boolean;
};

export type StudentWork = {
  restate: string;
  answer: string;
  cite: string;
  explain: string;
  sum: string;
  finalParagraph: string;
};

export type StudentSession = {
  studentName: string;
  assignmentId: string;
  assignmentTitle: string;
  work: StudentWork;
  lastSaved: string;
};