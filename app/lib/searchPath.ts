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
      } else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
        const genres = [...parentGenres];
        const blogPath = "/" + genres.join("/");

        results.push({
          title: path.basename(dir),
          genres,
          path: blogPath,
        });
      }
    }
  }

  walk(BLOG_DIR, ["blog"]);

  return results;
}
