import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays } from "lucide-react";

interface ArticleHeaderProps {
  title?: string;
  description?: string;
  tags?: string[];
  publishedAt?: string;
}

/**
 * フロントマター情報を記事ヘッダーとして表示するコンポーネント。
 * mdxファイル内で <ArticleHeader {...frontmatter} /> として使う。
 */
export function ArticleHeader({
  title,
  tags,
  publishedAt,
}: ArticleHeaderProps) {
  if (!title) return null;

  return (
    <div className="mb-8 space-y-3 not-prose">
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h1>

      {publishedAt && (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="size-4" />
          <time dateTime={publishedAt}>{publishedAt}</time>
        </div>
      )}

      <Separator />
    </div>
  );
}
