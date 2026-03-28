"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: CSSProperties["textAlign"];
  /** 시맨틱 제목·문단 등 HTML 태그만 허용 (React Bits SplitText와 동일) */
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  /**
   * false면 스크롤 없이 마운트 후 바로 재생 (히어로 등 첫 화면용).
   * true면 ScrollTrigger로 뷰포트 진입 시 재생 (React Bits 기본 동작).
   */
  useScrollTrigger?: boolean;
  onLetterAnimationComplete?: () => void;
};

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag: Tag = "p",
  useScrollTrigger = true,
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      void document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      if (animationCompletedRef.current) return;
      const el = ref.current;

      type ElWithSplit = HTMLElement & {
        _rbsplitInstance?: { revert: () => void };
      };
      const node = el as ElWithSplit;
      if (node._rbsplitInstance) {
        try {
          node._rbsplitInstance.revert();
        } catch {
          /* noop */
        }
        node._rbsplitInstance = undefined;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
      const sign =
        marginValue === 0
          ? ""
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let targets: gsap.TweenTarget | undefined;
      const assignTargets = (self: {
        chars: Element[];
        words: Element[];
        lines: Element[];
      }) => {
        if (splitType.includes("chars") && self.chars.length)
          targets = self.chars;
        if (!targets && splitType.includes("words") && self.words.length)
          targets = self.words;
        if (!targets && splitType.includes("lines") && self.lines.length)
          targets = self.lines;
        if (!targets)
          targets = self.chars || self.words || self.lines;
      };

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === "lines",
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
        reduceWhiteSpace: false,
        onSplit: (self) => {
          assignTargets(self);
          if (!targets) return;
          return gsap.fromTo(
            targets as gsap.TweenTarget,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              ...(useScrollTrigger
                ? {
                    scrollTrigger: {
                      trigger: el,
                      start,
                      once: true,
                      fastScrollEnd: true,
                      anticipatePin: 0.4,
                    },
                  }
                : {}),
              onComplete: () => {
                animationCompletedRef.current = true;
                onCompleteRef.current?.();
              },
              willChange: "transform, opacity",
              force3D: true,
            },
          );
        },
      });

      node._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch {
          /* noop */
        }
        node._rbsplitInstance = undefined;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        useScrollTrigger,
        fontsLoaded,
      ],
      scope: ref,
    },
  );

  const style: CSSProperties = {
    textAlign,
    overflow: "hidden",
    display: "inline-block",
    whiteSpace: "normal",
    wordWrap: "break-word",
    willChange: "transform, opacity",
  };
  const classes = `split-parent ${className}`;

  return (
    <Tag ref={ref as never} style={style} className={classes}>
      {text}
    </Tag>
  );
}
