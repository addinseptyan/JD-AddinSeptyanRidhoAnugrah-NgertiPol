'use client';

import { useState } from 'react';
import categories from '@/data/categories.json';
import type { CategoryType } from '@/types/CategoryType';
import { useRouter } from 'next/navigation';

export default function QuizPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleSelect = (categoryId: string) => {
    setSelected(categoryId);
    router.push(`/quiz/${categoryId}`); // asumsikan ada dynamic page untuk tiap kategori
  };

  return (
    <main className="min-h-screen bg-[#f7fafe] py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#404040]">
          Pilih Kategori Kuis
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(categories as CategoryType[]).map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={`rounded-xl p-5 text-left shadow hover:shadow-md transition border border-gray-200 bg-white hover:bg-[#f0f8ff]`}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <h2 className="font-bold text-lg text-[#404040] mb-1">{cat.name}</h2>
              <p className="text-sm text-gray-600">{cat.description}</p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
