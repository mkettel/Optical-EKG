import { Link, useTransitionRouter } from "next-view-transitions";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold mb-0">Optical EKG</h1>
        <h3 className="text-muted-foreground">Interactive tool to help learn and understand Electrophysiology</h3>
        <div className="mt-6">
          <Link href="/scene" className="px-4 py-2 border bg-slate-800 text-white rounded-full font-semibold">Get Started </Link>
        </div>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
