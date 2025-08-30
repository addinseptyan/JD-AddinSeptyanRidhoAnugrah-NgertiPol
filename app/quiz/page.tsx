'use client';

import { useEffect, useState } from 'react';
import quizDataRaw from '@/data/quiz.json';
import type { QuizData, QuizQuestion } from '@/types/quiz';

const quizData = quizDataRaw as QuizData;

export default function QuizPage() {
  const [category, setCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [lockedQuestions, setLockedQuestions] = useState<boolean[]>([]);

  useEffect(() => {
    if (category && quizData[category]) {
      const data = quizData[category] || [];
      setQuestions(data);
      setSelected(Array(data.length).fill(-1));
      setLockedQuestions(Array(data.length).fill(false));
      setCurrent(0);
      setShowFeedback(false);
      setFeedbackMessage(null);
    }
  }, [category]);

  const handleSelect = (index: number) => {
    if (lockedQuestions[current]) return; // Jangan bisa pilih ulang setelah dikunci
    const updated = [...selected];
    updated[current] = index;
    setSelected(updated);
  };

  const handleNext = () => {
    const currentQuestion = questions[current];
    const selectedIndex = selected[current];
    const selectedOption = currentQuestion.options[selectedIndex];

    // Jika trivia dan belum pernah dikirim, munculkan feedback dulu
    if (
      currentQuestion.type === 'trivia' &&
      selectedOption?.feedback &&
      !lockedQuestions[current]
    ) {
      setFeedbackMessage(selectedOption.feedback);
      setShowFeedback(true);

      const updatedLocks = [...lockedQuestions];
      updatedLocks[current] = true;
      setLockedQuestions(updatedLocks);
      return;
    }

    // Reset feedback untuk soal berikutnya
    setShowFeedback(false);
    setFeedbackMessage(null);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      // Hitung total skor
      let score = 0;
      selected.forEach((sel, i) => {
        const opt = questions[i]?.options[sel];
        score += opt?.score || 0;
      });

      // Hitung nilai huruf
      const maxScore = questions.length * 3;
      const percentage = (score / maxScore) * 100;
      let grade = 'E';
      if (percentage >= 85) grade = 'A';
      else if (percentage >= 70) grade = 'B';
      else if (percentage >= 55) grade = 'C';
      else if (percentage >= 40) grade = 'D';

      // Simpan ke localStorage
      const data = JSON.parse(localStorage.getItem('ngertipol_progress') || '{}');
      const history = {
        ...(data.history || {}),
        [category as string]: {
          score,
          total: questions.length,
          grade,
          completedAt: new Date().toISOString(),
        },
      };

      localStorage.setItem('ngertipol_progress', JSON.stringify({ history }));
      window.location.href = '/result';
    }
  };

  if (!category) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold mb-4">Pilih Kategori Kuis</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
          {Object.keys(quizData).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="py-3 px-4 bg-[#45b8e1] text-white rounded shadow"
            >
              {cat.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>
      </main>
    );
  }

  const question = questions[current];

  if (!question) {
    return (
      <main className="min-h-screen flex items-center justify-center text-center p-10">
        <p className="text-lg text-gray-500">Memuat pertanyaan...</p>
      </main>
    );
  }

  const isTrivia = question.type === 'trivia';
  const isLocked = lockedQuestions[current];
  const hasSelected = selected[current] !== -1;

  return (
    <main className="min-h-screen bg-[#f7fafe] px-6 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded">
        <h2 className="font-semibold text-lg mb-2">
          {current + 1} / {questions.length}
        </h2>
        <p className="mb-4 text-xl">{question.question}</p>

        <div className="space-y-4">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isTrivia && isLocked} // kunci pilihan kalau trivia dan sudah submit
              className={`block w-full text-left px-4 py-3 rounded border transition ${
                selected[current] === idx
                  ? 'bg-[#45b8e1] text-white'
                  : isTrivia && isLocked
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-50'
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>

        {showFeedback && feedbackMessage && (
          <div className="mt-4 p-4 bg-[#e0f7fa] text-[#00796b] rounded border border-[#4dd0e1] text-sm">
            💡 {feedbackMessage}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!hasSelected}
            className="bg-[#fac541] px-6 py-2 rounded-full text-[#404040] font-semibold disabled:opacity-30"
          >
            {isTrivia && !isLocked
              ? 'Kirim Jawaban'
              : current < questions.length - 1
              ? 'Lanjut ➡️'
              : 'Lihat Hasil'}
          </button>
        </div>
      </div>
    </main>
  );
}
