import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogMeta = {
  title: string;
  genres: string[];
  path: string;
};

export type Frontmatter = {
  title?: string;
  date?: string;
  tags?: string[];
  description?: string;
  [key: string]: unknown;
};

export type BlogWithFrontmatter = {
  /** フロントマターの title、なければディレクトリ名 */
  title: string;
  /** ファイルが属するジャンル（ディレクトリ階層） */
  genres: string[];
  /** ページへのパス */
  path: string;
  /** フロントマター情報 */
  frontmatter: Frontmatter;
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

/**
 * 指定したmd/mdxファイルのフロントマターを読み取る
 */
export function getFrontmatter(filePath: string): Frontmatter {
  const fullPath = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);
  const content = fs.readFileSync(fullPath, "utf-8");
  const { data } = matter(content);
  return data as Frontmatter;
}

/**
 * /blog/ 以下の全md/mdxファイルを探索し、フロントマター情報付きで返す
 */
export function getBlogsWithFrontmatter(): BlogWithFrontmatter[] {
  const results: BlogWithFrontmatter[] = [];

  function walk(dir: string, parentGenres: string[]) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath, [...parentGenres, entry.name]);
      } else if (
        entry.isFile() &&
        /\.(md|mdx)$/.test(entry.name)
      ) {
        const content = fs.readFileSync(fullPath, "utf-8");
        const { data } = matter(content);
        const frontmatter = data as Frontmatter;

        const genres = [...parentGenres];
        // page.md / page.mdx の場合はディレクトリがパスになる
        const dirName = path.basename(dir);
        const blogPath = "/" + genres.join("/");

        results.push({
          title: frontmatter.title || dirName,
          genres,
          path: blogPath,
          frontmatter,
        });
      }
    }
  }

  walk(BLOG_DIR, ["blog"]);

  return results;
}
