export interface QuizResult {
  score: number;
  total: number;
  grade?: string;
  completedAt: string;
}

export interface HistoryData {
  [quizId: string]: QuizResult;
}
