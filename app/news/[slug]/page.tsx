import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getAllNewsSlugs, getNewsBySlug } from "@/lib/news";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const news = getNewsBySlug(slug);
  if (!news) return { title: "글을 찾을 수 없습니다" };
  return {
    title: news.title,
    description: news.summary,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = getNewsBySlug(slug);
  if (!news) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-3 py-8 sm:px-6 sm:py-10 md:max-w-4xl md:px-8 md:py-12">
      <Link
        href="/"
        className="inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center rounded-lg px-1 text-[0.9375rem] font-semibold text-sky-700 transition active:bg-zinc-100 dark:text-zinc-400 dark:active:bg-zinc-800 sm:min-h-0 sm:min-w-0 sm:px-0 sm:text-sm md:hover:text-sky-900 dark:md:hover:text-sky-400"
      >
        ← 목록으로
      </Link>
      <header className="mt-5 border-b border-zinc-200 pb-8 dark:border-zinc-800 sm:mt-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-800 ring-1 ring-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-0 sm:text-sm">
            {news.category}
          </span>
          <time dateTime={news.date}>{news.date}</time>
        </div>
        <h1 className="mt-4 text-[1.375rem] font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl sm:leading-tight md:text-3xl">
          {news.title}
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-base">
          {news.summary}
        </p>
      </header>
      <div className="prose-wrap pt-8 sm:pt-10">
        <MarkdownBody content={news.content} />
      </div>
    </article>
  );
}
