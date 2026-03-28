"use client";

import AnimatedList from "@/components/react-bits/AnimatedList";
import { NewsCard } from "@/components/NewsCard";
import type { NewsListItem } from "@/lib/news";

type Props = {
  items: NewsListItem[];
};

export function HomeNewsList({ items }: Props) {
  return (
    <AnimatedList
      items={items}
      keyExtractor={(item) => item.slug}
      renderItem={(item) => <NewsCard item={item} />}
      scrollable={false}
      showGradients={false}
      enableArrowNavigation={false}
      staggerDelay={0.07}
    />
  );
}
