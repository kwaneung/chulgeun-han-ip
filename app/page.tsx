import { HomeHeroSection } from "@/components/HomeHeroSection";
import { HomeNewsList } from "@/components/HomeNewsList";
import { getAllNews } from "@/lib/news";

export default function Home() {
  const items = getAllNews();

  return (
    <div className="relative">
      <HomeHeroSection />
      <div className="relative z-10 mx-auto w-full max-w-3xl px-3 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8 md:max-w-4xl md:px-8 md:pb-12 md:pt-10">
        <HomeNewsList items={items} />
      </div>
    </div>
  );
}
