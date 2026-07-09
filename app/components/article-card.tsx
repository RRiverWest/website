import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

export interface ArticleMetadata {
  title: string;
  description?: string;
  tags?: string[];
  publishedAt?: string;
}

/**
 * mdx ファイルからメタデータを読み取る。
 * YAMLフロントマター (---) と export const metadata の両方に対応。
 */
function getMetadataFromFile(href: string): ArticleMetadata {
  const mdxPath = path.join(process.cwd(), "app", ...href.split("/").filter(Boolean), "page.mdx");
  const content = fs.readFileSync(mdxPath, "utf-8");

  // YAMLフロントマターを試す
  const { data } = matter(content);
  if (data && Object.keys(data).length > 0) {
    return data as ArticleMetadata;
  }

  // fallback: export const metadata = {...} を正規表現で抽出
  const match = content.match(/export\s+const\s+metadata\s*=\s*(\{[\s\S]*?\n\})/);
  if (match) {
    const fn = new Function(`return (${match[1]})`);
    return fn() as ArticleMetadata;
  }

  return { title: href };
}

interface ArticleCardProps {
  /** ページへのルートパス (例: "/blog/test") */
  href: string;
  className?: string;
}

/**
 * href を渡すだけで対象 page.mdx のメタデータを自動取得し、Card形式で表示する。
 * 使い方: <ArticleCard href="/blog/test" />
 */
export function ArticleCard({ href, className }: ArticleCardProps) {
  const metadata = getMetadataFromFile(href);
  const title = metadata.title || href;

  return (
    <Link href={href} className={cn("block transition-opacity hover:opacity-80", className)}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {metadata.description && (
            <CardDescription className="line-clamp-2">
              {metadata.description}
            </CardDescription>
          )}
        </CardHeader>

        {(metadata.publishedAt || (metadata.tags && metadata.tags.length > 0)) && (
          <CardContent>
            <div className="flex flex-wrap items-center gap-3">
              {metadata.publishedAt && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" />
                  <time dateTime={metadata.publishedAt}>{metadata.publishedAt}</time>
                </div>
              )}

              {metadata.tags && metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {metadata.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
