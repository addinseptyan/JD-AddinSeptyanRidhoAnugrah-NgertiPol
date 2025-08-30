'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { gradeMessages } from '@/data/gradeMessages';

interface ResultData {
  score: number;
  total: number;
  grade?: string;
  completedAt: string;
}

export default function ResultPage() {
  const [result, setResult] = useState<ResultData | null>(null);
  const [message, setMessage] = useState<string>('Yuk belajar lebih dalam lagi!');

  useEffect(() => {
    const stored = localStorage.getItem('ngertipol_progress');
    if (stored) {
      const parsed = JSON.parse(stored);
      const latest = Object.values(parsed.history || {}).pop() as ResultData;

      if (latest) {
        setResult(latest);

        const grade = latest.grade || 'E';
        setMessage(gradeMessages[grade] || gradeMessages['E']);
      }
    }
  }, []);

  if (!result) {
    return (
      <main className="min-h-screen flex items-center justify-center text-center px-6 bg-[#f7fafe] text-[#404040]">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Ups! Data hasil kuis tidak ditemukan.</h2>
          <Link href="/quiz">
            <button className="bg-[#fac541] hover:bg-[#eab728] text-[#404040] font-medium py-2 px-5 rounded-full shadow transition">
              Mulai Kuis
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f7fafe] text-[#404040] px-6">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-xl text-center">
        <h1 className="text-3xl font-bold text-[#45b8e1] mb-4">🎉 Hasil Kuis Kamu!</h1>
        <p className="text-4xl font-extrabold text-[#fac541] mb-4">{result.grade || 'E'}</p>
        <p className="text-md italic mb-6">{message}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="bg-[#34c759] hover:bg-[#28a745] text-white py-2 px-6 rounded-full transition font-medium">
              🏠 Home
            </button>
          </Link>
          <Link href="/quiz">
            <button className="bg-[#45b8e1] hover:bg-[#349ed0] text-white py-2 px-6 rounded-full transition font-medium">
              🔁 Main Lagi
            </button>
          </Link>
          <Link href="/materi">
            <button className="border border-[#45b8e1] text-[#45b8e1] hover:bg-[#e7f6fb] py-2 px-6 rounded-full transition font-medium">
              📚 Lihat Materi
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
