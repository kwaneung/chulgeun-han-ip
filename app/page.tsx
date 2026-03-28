import { NewsCard } from "@/components/NewsCard";
import { getAllNews } from "@/lib/news";

export default function Home() {
  const items = getAllNews();

  return (
    <div className="mx-auto w-full max-w-3xl px-3 py-8 sm:px-6 sm:py-10 md:max-w-4xl md:px-8 md:py-12">
      <div className="mb-8 sm:mb-10 md:mb-12">
        <p className="text-sm font-semibold text-sky-700 dark:text-sky-400 sm:text-base">
          출근한입
        </p>
        <h1 className="mt-2 text-[1.625rem] font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl sm:leading-tight md:text-4xl">
          오늘의 요약 뉴스
        </h1>
        <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-sm md:text-base">
          출근 전후로 읽기 좋은 IT 이슈를 카드로 모았습니다. 카드를 누르면
          마크다운 본문을 볼 수 있어요.
        </p>
      </div>
      <ul className="flex flex-col gap-3 sm:gap-4 md:gap-5">
        {items.map((item) => (
          <li key={item.slug} className="@container">
            <NewsCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
