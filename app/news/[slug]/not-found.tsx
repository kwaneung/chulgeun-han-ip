import Link from "next/link";

export default function NewsNotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-3 py-20 text-center sm:px-6 sm:py-24">
      <p className="text-sm font-semibold text-sky-800 dark:text-sky-400">404</p>
      <h1 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50 sm:text-2xl">
        해당 뉴스를 찾을 수 없습니다
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-400 sm:text-base">
        링크가 잘못되었거나 삭제된 글일 수 있어요.
      </p>
      <Link
        href="/"
        className="mt-8 flex min-h-[44px] touch-manipulation items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-medium text-zinc-50 transition active:scale-[0.98] hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 sm:py-3"
      >
        메인으로
      </Link>
    </div>
  );
}
