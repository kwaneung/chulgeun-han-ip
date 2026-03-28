import Link from "next/link";
import type { NewsListItem } from "@/lib/news";

type Props = {
  item: NewsListItem;
};

export function NewsCard({ item }: Props) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="group flex touch-manipulation flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-md ring-1 ring-zinc-950/5 transition active:scale-[0.99] dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-none dark:ring-0 sm:rounded-2xl sm:p-5 @md:p-6 @md:hover:shadow-lg @md:hover:ring-zinc-950/10 dark:@md:hover:border-zinc-600 dark:@md:hover:bg-zinc-800/80"
    >
      <div className="mb-2.5 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 sm:mb-3 sm:text-sm">
        <span className="rounded-full bg-sky-50 px-2.5 py-1 font-semibold text-sky-800 ring-1 ring-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-0">
          {item.category}
        </span>
        <time dateTime={item.date}>{item.date}</time>
      </div>
      <h2 className="text-[1.0625rem] font-semibold leading-snug text-zinc-900 transition group-hover:text-sky-800 dark:text-zinc-50 dark:group-hover:text-sky-300 sm:text-lg @md:text-xl">
        {item.title}
      </h2>
      <p className="mt-2 line-clamp-3 flex-1 text-[0.9375rem] leading-relaxed text-zinc-600 dark:text-zinc-300 sm:line-clamp-2 sm:text-sm @md:text-base">
        {item.summary}
      </p>
      <span className="mt-3 text-sm font-semibold text-sky-700 transition group-hover:text-sky-900 dark:text-zinc-400 dark:group-hover:text-sky-400 sm:mt-4 sm:text-xs">
        자세히 보기 →
      </span>
    </Link>
  );
}
