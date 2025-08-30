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

export type QuizCategory =
  | 'roleplay-pemimpin'
  | 'tebak-tokoh-politik'
  | 'situasi-sehari-hari'
  | 'trivia-politik'
  | 'aspirasi-masa-depan';

export type QuizData = {
  [category: string]: QuizQuestion[];
};
