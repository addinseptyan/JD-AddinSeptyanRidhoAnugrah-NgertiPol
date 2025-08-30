'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Materi } from '@/types/materi';
import materiData from '@/data/materi.json';

export default function MateriPage() {
  const [materiList, setMateriList] = useState<Materi[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Tipe data dari materiData sudah cocok dengan Materi[]
    setMateriList(materiData as Materi[]);
  }, []);

  return (
    <main className="min-h-screen bg-[#f7fafe] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#45b8e1]">📚 Ngulik Materi</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {materiList.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`/materi/${item.id}`)}
              className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-[#404040] mb-2">{item.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{item.summary}</p>
                <div className="flex flex-wrap gap-1 text-xs text-[#45b8e1]">
                  {item.tags.map((tag) => (
                    <span key={tag} className="bg-[#e7f6fb] px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
