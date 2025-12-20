import fs from "fs";
import path from "path";

export type BlogMeta = {
  title: string;
  genres: string[];
  path: string;
};

const BLOG_DIR = path.join(process.cwd(), "app", "blog");

export function getBlogs(): BlogMeta[] {
  const results: BlogMeta[] = [];

  function walk(dir: string, parentGenres: string[]) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath, [...parentGenres, entry.name]);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        const fileName = entry.name.replace(/\.md$/, "");

        const genres = [...parentGenres]; // ex ["blog", "travel"]
        const blogPath = "/" + genres.join("/") + "/" + fileName;

        results.push({
          title: fileName,
          genres,
          path: blogPath,
        });
      }
    }
  }

  walk(BLOG_DIR, ["blog"]); // blog フォルダから探索

  return results;
}
