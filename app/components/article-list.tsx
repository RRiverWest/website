import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ArticleCard } from "@/components/article-card";
import { cn } from "@/lib/utils";

interface ArticleListProps {
  /** 一覧表示するディレクトリのルートパス (例: "/tech/other") */
  dir: string;
  className?: string;
}

/**
 * 指定ディレクトリ以下の page.mdx を探索し、ArticleCard を一覧表示する。
 * 使い方: <ArticleList dir="/tech/other" />
 */
export function ArticleList({ dir, className }: ArticleListProps) {
  const basePath = path.join(process.cwd(), "app", ...dir.split("/").filter(Boolean));
  const articles = findArticles(basePath, dir);

  // publishedAt で降順ソート
  articles.sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));

  if (articles.length === 0) {
    return <p className="text-sm text-muted-foreground">記事がありません。</p>;
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {articles.map((article) => (
        <ArticleCard key={article.href} href={article.href} />
      ))}
    </div>
  );
}

type ArticleEntry = {
  href: string;
  publishedAt?: string;
};

function findArticles(dirPath: string, routeBase: string): ArticleEntry[] {
  const results: ArticleEntry[] = [];

  if (!fs.existsSync(dirPath)) return results;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const subDir = path.join(dirPath, entry.name);
    const mdxFile = path.join(subDir, "page.mdx");

    if (fs.existsSync(mdxFile)) {
      const content = fs.readFileSync(mdxFile, "utf-8");
      const { data } = matter(content);
      const href = `${routeBase}/${entry.name}`;

      results.push({
        href,
        publishedAt: data.publishedAt,
      });
    }

    // 再帰的に探索
    const nested = findArticles(subDir, `${routeBase}/${entry.name}`);
    results.push(...nested);
  }

  return results;
}
