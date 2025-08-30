'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import quizDataRaw from '@/data/quiz.json';
import type { QuizQuestion } from '@/types/QuizType';

const quizData = quizDataRaw;

export default function QuizByCategoryPage() {
  const { category } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof category === 'string' && category in quizData) {
      const data = quizData[category as keyof typeof quizData] || [];
      setQuestions(data as QuizQuestion[]);
      setSelected(Array(data.length).fill(-1));
    } else {
      router.push('/quiz');
    }
  }, [category]);

  const handleSelect = (index: number) => {
    if (showFeedback) return; // disable klik jika feedback sudah ditampilkan
    const updated = [...selected];
    updated[current] = index;
    setSelected(updated);
  };

  const handleSubmitAnswer = () => {
    const currentQuestion = questions[current];
    const selectedIndex = selected[current];
    const feedback = currentQuestion?.options?.[selectedIndex]?.feedback;
    if (feedback) {
      setFeedbackMessage(feedback);
      setShowFeedback(true);
    } else {
      handleNext();
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setFeedbackMessage(null);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      // Hitung skor dan simpan hasil
      let score = 0;
      selected.forEach((sel, i) => {
        const opt = questions[i]?.options?.[sel];
        score += opt?.score || 0;
      });

      const maxScore = questions.length * 3;
      const percentage = (score / maxScore) * 100;
      let grade = 'E';
      if (percentage >= 85) grade = 'A';
      else if (percentage >= 70) grade = 'B';
      else if (percentage >= 55) grade = 'C';
      else if (percentage >= 40) grade = 'D';

      const data = JSON.parse(localStorage.getItem('ngertipol_progress') || '{}');
      const history = {
        ...(data.history || {}),
        [category as string]: {
          score,
          total: questions.length,
          grade,
          completedAt: new Date().toISOString()
        }
      };

      localStorage.setItem('ngertipol_progress', JSON.stringify({ history }));
      router.push('/result');
    }
  };

  if (!questions.length) {
    return <p className="p-6 text-center text-gray-500">Memuat soal...</p>;
  }

  const currentQuestion = questions[current];

  return (
    <main className="min-h-screen bg-[#f7fafe] px-6 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded">
        <h2 className="font-semibold text-lg mb-2">
          Soal {current + 1} dari {questions.length}
        </h2>
        <p className="mb-4 text-xl">{currentQuestion.question}</p>
        <div className="space-y-4">
          {currentQuestion.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={showFeedback}
              className={`block w-full text-left px-4 py-3 rounded border ${
                selected[current] === idx
                  ? 'bg-[#45b8e1] text-white'
                  : 'bg-gray-50'
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>

        {feedbackMessage && (
          <p className="mt-4 text-sm italic bg-yellow-100 text-yellow-800 p-3 rounded">
            💡 {feedbackMessage}
          </p>
        )}

        <div className="mt-6 flex justify-end">
          {!showFeedback ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selected[current] === -1}
              className="bg-[#fac541] px-6 py-2 rounded-full text-[#404040] font-semibold disabled:opacity-30"
            >
              Kirim Jawaban
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-[#45b8e1] px-6 py-2 rounded-full text-white font-semibold"
            >
              Lanjut
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
