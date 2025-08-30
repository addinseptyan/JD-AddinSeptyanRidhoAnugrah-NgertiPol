import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed bottom-5 w-full z-50">
      <div className="bg-white shadow-md h-full max-w-6xl mx-auto w-[90%] sm:w-[70%] md:w-[40%] py-4 px-6 flex justify-between items-center rounded-2xl">
        <Link href="/" className="">
            <h1 className="text-xl font-bold text-[#45b8e1]">NgertiPol</h1>
        </Link>
        <div className="flex gap-12">
            <Link href="/quiz">
                🎮
            </Link>
            <Link href="/materi">
                📚
            </Link>
        </div>
      </div>
    </header>
  );
}
