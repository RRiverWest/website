"use client";

import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

/**
 * ページ内の見出し (h2, h3) を自動検出して目次を表示するコンポーネント。
 * mdxファイル内で <TableOfContents /> と書くだけで使える。
 */
export function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const headings = document.querySelectorAll("h1, h2, h3");
    const tocItems: TocItem[] = [];

    headings.forEach((heading) => {
      // idがなければテキストからslugを生成して付与
      if (!heading.id) {
        heading.id = slugify(heading.textContent || "");
      }

      tocItems.push({
        id: heading.id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName[1]),
      });
    });

    setItems(tocItems);
  }, []);

  if (items.length === 0) return null;

  return (
    <nav className="my-6 rounded-lg border border-border bg-card p-4 not-prose">
      <p className="mb-3 text-sm font-semibold text-foreground">目次</p>
      <ul className="space-y-1.5 text-sm">
        {items.map((item, index) => (
          <li
            key={`${item.id}-${index}`}
            className={
              item.level === 2 ? "ml-4" : item.level === 3 ? "ml-8" : ""
            }
          >
            <a
              href={`#${item.id}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-ぁ-んァ-ヶ一-龠]/g, "");
}
