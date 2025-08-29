'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HistoryData {
  [key: string]: {
    score: number;
    total: number;
    completedAt: string;
  };
}

export default function HomePage() {
  const [history, setHistory] = useState<HistoryData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('ngertipol_progress');
    if (data) {
      const parsed = JSON.parse(data);
      setHistory(parsed.history || {});
    }
  }, []);

  return (
    <main className="w-full px-4 py-8 sm:px-6 md:px-12 lg:px-24 xl:px-32 mx-auto bg-[#fff0f0] text-[#404040] min-h-screen">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/logo-ngertipol.jpeg"
          alt="Logo NgertiPol"
          width={160}
          height={160}
          priority
          className="rounded-full shadow-lg"
        />
      </div>

      {/* Judul */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-[#830101] mb-2">NgertiPol</h1>
      <p className="text-md sm:text-lg text-center italic mb-6">
        "Bukan sekadar milih. Tapi paham."
      </p>

      {/* Deskripsi */}
      <p className="text-sm sm:text-md md:text-lg text-center max-w-2xl mx-auto mb-8">
        Game kuis politik interaktif untuk bantu kamu paham isu politik lokal dan nasional dengan cara yang seru dan ringan.
      </p>

      {/* Tombol */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <Link href="/kuis">
          <button className="bg-[#830101] hover:bg-[#660000] text-white px-6 py-3 rounded-full text-base sm:text-lg shadow transition">
            🎮 Mulai Kuis
          </button>
        </Link>
        <Link href="/materi">
          <button className="border border-[#830101] text-[#830101] px-6 py-3 rounded-full text-base sm:text-lg hover:bg-[#ffeaea] transition">
            📚 Lihat Materi
          </button>
        </Link>
      </div>

      {/* Progress */}
      {history && Object.keys(history).length > 0 && (
        <div className="bg-[#f9dede] rounded-lg p-6 max-w-2xl mx-auto shadow-sm">
          <h2 className="text-md font-semibold mb-2 text-[#830101] text-center">
            📈 Progress Terakhirmu
          </h2>
          <ul className="text-sm text-left space-y-2">
            {Object.entries(history).map(([topic, data]) => (
              <li key={topic}>
                ✅ <strong className="text-[#000000]">{topic.replace(/-/g, ' ')}</strong>: {data.score}/{data.total} –{' '}
                {new Date(data.completedAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
