import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="w-full bg-black min-h-screen text-white overflow-x-hidden selection:bg-lime selection:text-black flex items-center justify-center">
      <div className="flex flex-col items-start gap-6 p-8 max-w-lg">
        <span className="text-[10px] tracking-widest text-lime uppercase font-bold">[ 404 ]</span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none uppercase">
          PAGE NOT<br />FOUND<span className="text-lime">.</span>
        </h1>
        <p className="text-sm text-green-off-white-2 leading-relaxed">
          The page you are looking for does not exist or has moved.
        </p>
        <Link
          href="/"
          className="bg-lime text-black px-8 py-3.5 font-bold uppercase tracking-wider text-xs border border-lime hover:bg-transparent hover:text-lime transition-all duration-300"
        >
          BACK TO HOME
        </Link>
      </div>
    </main>
  );
}
