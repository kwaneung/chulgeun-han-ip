import Link from "next/link";
import { HeaderWeather } from "@/components/HeaderWeather";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/50 bg-white/35 shadow-[0_1px_0_0_rgba(0,0,0,0.05)] backdrop-blur-2xl backdrop-saturate-150 dark:border-zinc-600/40 dark:bg-zinc-950/35 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)]">
      <div className="mx-auto w-full max-w-3xl px-3 py-3 sm:px-6 md:max-w-4xl md:px-8">
        <div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
          <Link
            href="/"
            className="flex min-h-[44px] shrink-0 touch-manipulation items-center text-base font-semibold tracking-tight text-zinc-900 transition active:opacity-80 dark:text-zinc-50 sm:text-lg md:min-h-0 md:text-xl md:hover:text-sky-700 dark:md:hover:text-sky-400"
          >
            출근한입
          </Link>
          <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
            <p className="min-w-0 flex-1 truncate text-right text-xs font-medium leading-snug text-zinc-900 dark:text-zinc-50 sm:text-sm">
              IT 뉴스 · 짧은 요약
            </p>
            <div className="shrink-0">
              <HeaderWeather />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
