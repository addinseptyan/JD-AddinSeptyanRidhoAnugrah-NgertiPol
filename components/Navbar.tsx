"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed bottom-5 w-full z-50">
      <div className="bg-white shadow-md h-full max-w-6xl mx-auto w-[90%] sm:w-[70%] md:w-[40%] py-4 px-6 flex justify-between items-center rounded-2xl">
        <Link href="/" className="">
          <h1 className="text-xl font-bold text-primary">NgertiPol</h1>
        </Link>
        <div className="flex gap-12">
          <Link
            href="/quiz"
            className={`rounded p-1 ${
              pathname.includes("/quiz") ? "bg-primary" : "bg-background"
            }`}
          >
            🎮
          </Link>
          <Link
            href="/materi"
            className={`rounded p-1 ${
              pathname.includes("/materi") ? "bg-primary" : "bg-background"
            }`}
          >
            📚
          </Link>
        </div>
      </div>
    </header>
  );
}
