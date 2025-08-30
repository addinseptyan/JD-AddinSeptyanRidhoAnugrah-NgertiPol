export type QuizOption = {
  text: string;
  feedback?: string;
  score?: number; // untuk roleplay
};

export type QuizQuestion = {
  type: 'roleplay' | 'trivia';
  question: string;
  options: QuizOption[];
};

export type QuizData = {
  [category: string]: QuizQuestion[];
};
