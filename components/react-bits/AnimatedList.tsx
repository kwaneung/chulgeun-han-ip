"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEventHandler,
  type ReactNode,
  type UIEvent,
} from "react";
import { motion, useInView } from "motion/react";

export type AnimatedItemProps = {
  children: ReactNode;
  delay?: number;
  index: number;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
};

export function AnimatedItem({
  children,
  delay = 0,
  index,
  onMouseEnter,
  onClick,
  className = "",
}: AnimatedItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type AnimatedListProps<T> = {
  items: readonly T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  onItemSelect?: (item: T, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  itemClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
  /** 스크롤 영역 사용 (예: 고정 높이 목록). false면 페이지 전체 스크롤만 사용 */
  scrollable?: boolean;
  maxHeightClass?: string;
  staggerDelay?: number;
};

export default function AnimatedList<T>({
  items,
  renderItem,
  keyExtractor,
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = false,
  className = "",
  itemClassName = "",
  displayScrollbar = true,
  initialSelectedIndex = -1,
  scrollable = false,
  maxHeightClass = "max-h-[400px]",
  staggerDelay = 0.08,
}: AnimatedListProps<T>) {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

  const handleItemMouseEnter = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleItemClick = useCallback(
    (item: T, index: number) => {
      setSelectedIndex(index);
      onItemSelect?.(item, index);
    },
    [onItemSelect],
  );

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1),
    );
  };

  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          onItemSelect?.(items[selectedIndex], selectedIndex);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(
      `[data-index="${selectedIndex}"]`,
    ) as HTMLElement | null;
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: "smooth" });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: "smooth",
        });
      }
    }
    queueMicrotask(() => {
      setKeyboardNav(false);
    });
  }, [selectedIndex, keyboardNav]);

  if (!scrollable) {
    return (
      <ul
        className={`relative m-0 flex w-full list-none flex-col gap-3 p-0 sm:gap-4 md:gap-5 ${className}`}
      >
        {items.map((item, index) => (
          <li key={keyExtractor(item, index)} className="@container">
            <AnimatedItem
              delay={staggerDelay * index}
              index={index}
              onMouseEnter={() => handleItemMouseEnter(index)}
              onClick={() => handleItemClick(item, index)}
              className={itemClassName}
            >
              {renderItem(item, index)}
            </AnimatedItem>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div
        ref={listRef}
        className={`${maxHeightClass} space-y-4 overflow-y-auto p-4 ${
          displayScrollbar
            ? "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-zinc-100 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-zinc-300 dark:[&::-webkit-scrollbar-track]:bg-zinc-900 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
            : "scrollbar-hide"
        }`}
        onScroll={handleScroll}
        style={{
          scrollbarWidth: displayScrollbar ? "thin" : "none",
          scrollbarColor: "rgb(212 212 216) rgb(244 244 245)",
        }}
      >
        {items.map((item, index) => (
          <AnimatedItem
            key={keyExtractor(item, index)}
            delay={staggerDelay * index}
            index={index}
            onMouseEnter={() => handleItemMouseEnter(index)}
            onClick={() => handleItemClick(item, index)}
            className={itemClassName}
          >
            {renderItem(item, index)}
          </AnimatedItem>
        ))}
      </div>
      {showGradients && (
        <>
          <div
            className="pointer-events-none absolute left-0 right-0 top-0 h-12 bg-gradient-to-b from-zinc-50 to-transparent transition-opacity duration-300 ease-out dark:from-zinc-950"
            style={{ opacity: topGradientOpacity }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-50 to-transparent transition-opacity duration-300 ease-out dark:from-zinc-950"
            style={{ opacity: bottomGradientOpacity }}
            aria-hidden
          />
        </>
      )}
    </div>
  );
}
