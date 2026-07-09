import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface OgpData {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  favicon?: string;
}

/**
 * URLからHTML取得し、meta タグから OGP 情報をパースする
 */
async function fetchOgp(url: string): Promise<OgpData> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 }, // 24時間キャッシュ
      headers: {
        "User-Agent": "bot",
      },
    });

    if (!res.ok) return {};

    const html = await res.text();

    const getMetaContent = (property: string): string | undefined => {
      // og:xxx, twitter:xxx 両方に対応
      const regex = new RegExp(
        `<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["']|<meta[^>]*content=["']([^"']*)["'][^>]*(?:property|name)=["']${property}["']`,
        "i"
      );
      const match = html.match(regex);
      return match?.[1] || match?.[2] || undefined;
    };

    const getTitle = (): string | undefined => {
      const ogTitle = getMetaContent("og:title");
      if (ogTitle) return ogTitle;
      const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
      return titleMatch?.[1]?.trim() || undefined;
    };

    const origin = new URL(url).origin;

    return {
      title: getTitle(),
      description: getMetaContent("og:description") || getMetaContent("description"),
      image: getMetaContent("og:image"),
      siteName: getMetaContent("og:site_name"),
      favicon: `${origin}/favicon.ico`,
    };
  } catch {
    return {};
  }
}

interface LinkCardProps {
  /** 外部リンクURL */
  href: string;
  className?: string;
}

/**
 * 外部リンクのURL を渡すと、リンク先の OGP 情報を取得しカード形式で表示するサーバーコンポーネント。
 * 使い方: <LinkCard href="https://example.com" />
 */
export async function LinkCard({ href, className }: LinkCardProps) {
  const ogp = await fetchOgp(href);
  const displayUrl = new URL(href).hostname;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("block transition-opacity hover:opacity-80 no-underline", className)}
    >
      <Card className="flex-row items-center overflow-hidden p-4 gap-4">
        {/* Favicon */}
        {ogp.favicon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ogp.favicon}
            alt=""
            width={32}
            height={32}
            className="rounded-sm shrink-0"
          />
        )}

        {/* テキスト部分 */}
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <CardHeader className="p-0 gap-1">
            <CardTitle className="text-base line-clamp-1">
              {ogp.title || href}
            </CardTitle>
            {ogp.description && (
              <CardDescription className="line-clamp-2 text-xs">
                {ogp.description}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="p-0">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="truncate">{ogp.siteName || displayUrl}</span>
              <ExternalLink className="size-3 shrink-0" />
            </div>
          </CardContent>
        </div>
      </Card>
    </a>
  );
}
