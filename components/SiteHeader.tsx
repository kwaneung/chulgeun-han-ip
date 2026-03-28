import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95 dark:shadow-none">
      <div className="mx-auto w-full max-w-3xl px-3 py-3 sm:px-6 md:max-w-4xl md:px-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
          <Link
            href="/"
            className="flex min-h-[44px] w-fit touch-manipulation items-center text-base font-semibold tracking-tight text-zinc-900 transition active:opacity-80 dark:text-zinc-50 sm:text-lg md:min-h-0 md:text-xl md:hover:text-sky-700 dark:md:hover:text-sky-400"
          >
            출근한입
          </Link>
          <p className="text-xs font-medium leading-snug text-zinc-500 dark:text-zinc-400 md:text-center md:text-sm">
            IT 뉴스 · 짧은 요약
          </p>
        </div>
      </div>
    </header>
  );
}
