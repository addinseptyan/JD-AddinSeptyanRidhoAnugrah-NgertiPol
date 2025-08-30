"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { HistoryData } from "@/types/HistoryType";

export default function HomePage() {
  const [history, setHistory] = useState<HistoryData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("ngertipol_progress");
    if (data) {
      const parsed = JSON.parse(data);
      setHistory(parsed.history || {});
    }
  }, []);

  const handleReset = () => {
    const confirmReset = window.confirm(
      "⚠️ Apakah kamu yakin ingin menghapus semua progress kuis? Tindakan ini tidak bisa dibatalkan."
    );
    if (confirmReset) {
      localStorage.removeItem("ngertipol_progress");
      setHistory(null);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#e3eefc] text-[#404040] flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Kolom Kiri - Konten */}
        <div className="space-y-3 order-2 md:order-1 pb-10 md:pb-0">
          <div>
            <h1 className="text-4xl md:text-9xl font-bold text-[#45b8e1] mb-2">
              NgertiPol
            </h1>
            <p className="italic text-lg text-[#404040]">
              "Bukan sekadar milih. Tapi paham."
            </p>
          </div>

          <p className="text-md md:text-lg text-[#404040] py-4">
            Game kuis politik interaktif untuk bantu kamu paham isu politik
            lokal dan nasional dengan cara yang seru dan ringan.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quiz">
                <button className="bg-secondary hover:bg-primary text-foreground hover:text-background font-medium py-3 px-6 rounded-full shadow-md transition hover:shadow-lg hover:cursor-pointer">
                  🎮 Main Dulu, Ah!
                </button>
              </Link>
              <Link href="/materi">
                <button className="border border-[#fac541] hover:border-primary text-foreground hover:text-white hover:bg-primary font-medium py-3 px-6 rounded-full transition hover:shadow-lg hover:cursor-pointer">
                  📚 Buka Wawasanmu
                </button>
              </Link>
            </div>
            
            {history && Object.keys(history).length > 0 && (
              <button
                onClick={handleReset}
                className="bg-[#ff6b6b] hover:bg-[#e55a5a] text-white font-medium py-3 px-6 rounded-full shadow-md transition hover:shadow-lg w-64"
              >
                ♻️ Reset Hasil Kuis
              </button>
            )}
          </div>

          {history && Object.keys(history).length > 0 && (
            <div className="bg-[#fff9e8] border border-[#fac541] rounded-md p-4 shadow-sm mt-6">
              <h2 className="text-sm font-semibold text-[#fac541] mb-3">
                📈 Progress Terakhirmu
              </h2>
              <ul className="text-sm text-[#404040] space-y-3">
                {Object.entries(history)
                  .sort(
                    ([, a], [, b]) =>
                      new Date(b.completedAt).getTime() -
                      new Date(a.completedAt).getTime()
                  )
                  .map(([topic, data]) => {
                    const formattedName = topic
                      .replace(/^kuis-?/i, "") // hapus prefix 'kuis-' jika ada
                      .replace(/-/g, " ") // ganti - jadi spasi
                      .replace(/\b\w/g, (c) => c.toUpperCase()); // kapitalisasi awal kata

                    return (
                      <li
                        key={topic}
                        className="border-b border-[#fac541] pb-2"
                      >
                        <div>
                          <strong>📌 Kuis:</strong> {formattedName}
                        </div>
                        <div>
                          <strong>🎓 Nilai:</strong>{" "}
                          {data.grade || "Belum dinilai"}
                        </div>
                        <div>
                          <strong>⏰ Waktu:</strong>{" "}
                          {new Date(data.completedAt).toLocaleString("id-ID", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
        </div>

        {/* Kolom Kanan - Logo */}
        <div className="flex justify-center md:justify-end order-1 md:order-2">
          <Image
            src="/logo-ngertipol.jpeg"
            alt="Logo NgertiPol"
            width={280}
            height={280}
            priority
            className="rounded-full shadow-lg"
          />
        </div>
      </div>
    </main>
  );
}
