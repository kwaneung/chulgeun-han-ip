import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content/news");

export type NewsItem = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  content: string;
};

export type NewsListItem = Omit<NewsItem, "content">;

function parseNewsFile(slug: string): NewsItem {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title),
    summary: String(data.summary),
    date: String(data.date),
    category: String(data.category),
    content,
  };
}

export function getAllNewsSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs
    .readdirSync(contentDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllNews(): NewsListItem[] {
  return getAllNewsSlugs()
    .map((slug) => {
      const item = parseNewsFile(slug);
      return {
        slug: item.slug,
        title: item.title,
        summary: item.summary,
        date: item.date,
        category: item.category,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNewsBySlug(slug: string): NewsItem | null {
  try {
    return parseNewsFile(slug);
  } catch {
    return null;
  }
}
