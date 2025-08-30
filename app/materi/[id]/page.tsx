import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Materi } from '@/types/MateriType';
import materiData from '@/data/materi.json';

interface MateriDetailPageProps {
  params: {
    id: string;
  };
}

export default function MateriDetailPage({ params }: MateriDetailPageProps) {
  const materiList = materiData as Materi[];
  const materi = materiList.find((item) => item.id === params.id);

  if (!materi) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7fafe] px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">

        {/* Header dengan tombol kembali */}
        <div className="flex items-center gap-4 mb-4">
          <Link href="/materi">
            <button className="text-sm text-[#45b8e1] hover:underline">
              🔙 Kembali
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-[#45b8e1]">{materi.title}</h1>
        </div>

        {/* Gambar jika ada */}
        {materi.image && (
          <img
            src={materi.image}
            alt={materi.title}
            className="w-full h-64 object-cover rounded mb-6"
          />
        )}

        <p className="text-sm text-gray-600 italic mb-4">{materi.summary}</p>

        <article className="prose prose-sm sm:prose-base max-w-none text-[#404040]">
          {materi.content.split('\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </article>

        <div className="mt-6 flex flex-wrap gap-2">
          {materi.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#e7f6fb] text-[#45b8e1] px-3 py-1 rounded-full text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
