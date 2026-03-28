import Link from "next/link";
import { HeaderWeather } from "@/components/HeaderWeather";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/50 bg-white/35 shadow-[0_1px_0_0_rgba(0,0,0,0.05)] backdrop-blur-2xl backdrop-saturate-150 dark:border-zinc-600/40 dark:bg-zinc-950/35 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)]">
      <div className="mx-auto w-full max-w-3xl px-3 py-3 sm:px-6 md:max-w-4xl md:px-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
          <Link
            href="/"
            className="flex min-h-[44px] w-fit touch-manipulation items-center text-base font-semibold tracking-tight text-zinc-900 transition active:opacity-80 dark:text-zinc-50 sm:text-lg md:min-h-0 md:text-xl md:hover:text-sky-700 dark:md:hover:text-sky-400"
          >
            출근한입
          </Link>
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <p className="text-xs font-medium leading-snug text-zinc-900 dark:text-zinc-50 md:text-sm">
              IT 뉴스 · 짧은 요약
            </p>
            <HeaderWeather />
          </div>
        </div>
      </div>
    </header>
  );
}
