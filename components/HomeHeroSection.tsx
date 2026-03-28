"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import Grainient from "@/components/react-bits/Grainient";
import SplitText from "@/components/react-bits/SplitText";
import SpotlightCard from "@/components/react-bits/SpotlightCard";

export function HomeHeroSection() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const grainientColors = isDark
    ? { color1: "#c084fc", color2: "#5b21b6", color3: "#1e1033" }
    : { color1: "#FF9FFC", color2: "#5227FF", color3: "#B19EEF" };

  const spotlight = isDark
    ? "rgba(255, 255, 255, 0.09)"
    : "rgba(14, 165, 233, 0.2)";

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0">
        <Grainient
          {...grainientColors}
          timeSpeed={0.22}
          warpStrength={1.05}
          grainAmount={0.08}
          contrast={1.35}
        />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-3xl px-3 pt-8 sm:px-6 sm:pt-10 md:max-w-4xl md:px-8 md:pt-12">
        <SpotlightCard
          spotlightColor={spotlight}
          className="rounded-3xl border border-white/45 bg-white/50 shadow-md ring-1 ring-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/50 dark:ring-white/10"
        >
          <div className="px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400 sm:text-sm">
              출근한입
            </p>
            <div className="mt-4 sm:mt-5 md:mt-6">
              <SplitText
                text="오늘의 요약 뉴스"
                tag="h1"
                className="text-3xl font-semibold leading-[1.15] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl md:text-5xl"
                textAlign="left"
                splitType="chars"
                delay={45}
                duration={1.2}
                useScrollTrigger={false}
              />
            </div>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:mt-6 sm:text-lg md:text-xl">
              출근 전후로 읽기 좋은 IT 이슈를 카드로 모았습니다. 카드를 누르면
              마크다운 본문을 볼 수 있어요.
            </p>
          </div>
        </SpotlightCard>
      </div>
    </>
  );
}
