import Link from "next/link";
import { getFrontmatter } from "@/lib/searchPath";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface ArticleCardProps {
  /** md/mdxファイルへのパス (例: "app/blog/test/page.md") */
  path: string;
  className?: string;
}

/**
 * 指定したmd/mdxファイルのフロントマターを読み取り、Cardで表示するコンポーネント。
 */
export function ArticleCard({ path: filePath, className }: ArticleCardProps) {
  const frontmatter = getFrontmatter(filePath);

  // ファイルパスからルートパスを生成 (例: "app/blog/test/page.md" → "/blog/test")
  const href =
    "/" +
    filePath.replace(/^app\//, "").replace(/\/page\.(md|mdx)$/, "");

  const title = frontmatter.title || href;

  return (
    <Link href={href} className={cn("block transition-opacity hover:opacity-80", className)}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {frontmatter.description && (
            <CardDescription className="line-clamp-2">
              {frontmatter.description}
            </CardDescription>
          )}
        </CardHeader>

        {(frontmatter.date || (frontmatter.tags && frontmatter.tags.length > 0)) && (
          <CardContent>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              {frontmatter.date && (
                <time dateTime={frontmatter.date}>{frontmatter.date}</time>
              )}

              {frontmatter.tags && frontmatter.tags.length > 0 && (
                <>
                  {frontmatter.date && <span aria-hidden="true">·</span>}
                  <div className="flex flex-wrap gap-1">
                    {frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
