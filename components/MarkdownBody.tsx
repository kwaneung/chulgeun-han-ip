import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  content: string;
};

const proseClass = [
  "prose prose-sm max-w-none",
  "prose-headings:scroll-mt-28 prose-headings:font-semibold",
  "prose-headings:text-zinc-900",
  "prose-h1:text-2xl prose-h2:mt-8 prose-h2:text-lg prose-h3:text-base",
  "prose-p:text-zinc-700 prose-p:leading-relaxed",
  "prose-strong:text-zinc-900 prose-strong:font-semibold",
  "prose-a:text-sky-700 prose-a:font-medium prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-sky-900",
  "prose-code:rounded-md prose-code:border prose-code:border-zinc-300/80 prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.875em] prose-code:font-semibold prose-code:text-zinc-800",
  "prose-pre:rounded-xl prose-pre:border prose-pre:border-zinc-200 prose-pre:bg-zinc-900 prose-pre:text-zinc-50",
  "prose-blockquote:border-l-4 prose-blockquote:border-sky-600 prose-blockquote:bg-zinc-100 prose-blockquote:py-0.5 prose-blockquote:text-zinc-700 prose-blockquote:not-italic",
  "prose-li:marker:text-zinc-400 prose-li:text-zinc-700",
  "prose-hr:border-zinc-200",
  "prose-th:border prose-th:border-zinc-300 prose-th:bg-zinc-100 prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:text-sm prose-th:font-semibold prose-th:text-zinc-900",
  "prose-td:border prose-td:border-zinc-200 prose-td:px-3 prose-td:py-2 prose-td:text-sm prose-td:text-zinc-700",
  "sm:prose-base md:prose-lg sm:prose-h2:mt-10 sm:prose-h2:text-xl",
  /* --- 다크 --- */
  "dark:prose-headings:text-zinc-50",
  "dark:prose-p:text-zinc-300",
  "dark:prose-strong:text-zinc-50",
  "dark:prose-a:text-sky-400 dark:hover:prose-a:text-sky-300",
  "dark:prose-code:border-zinc-600 dark:prose-code:bg-zinc-800 dark:prose-code:text-sky-200",
  "dark:prose-pre:border-zinc-700 dark:prose-pre:bg-zinc-950",
  "dark:prose-blockquote:border-sky-500 dark:prose-blockquote:bg-zinc-900/80 dark:prose-blockquote:text-zinc-300",
  "dark:prose-li:marker:text-zinc-500 dark:prose-li:text-zinc-300",
  "dark:prose-hr:border-zinc-700",
  "dark:prose-th:border-zinc-600 dark:prose-th:bg-zinc-800 dark:prose-th:text-zinc-50",
  "dark:prose-td:border-zinc-700 dark:prose-td:text-zinc-300",
].join(" ");

export function MarkdownBody({ content }: Props) {
  return (
    <div className={proseClass}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, ...props }) => {
            const external = href?.startsWith("http");
            return (
              <a
                href={href}
                className="touch-manipulation"
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
