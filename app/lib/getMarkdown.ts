import fs from "fs";
import path from "path";

export async function getMarkdown(file: string) {
  const filepath = path.join(process.cwd(), "markdown", file);
  return fs.readFileSync(filepath, "utf-8");
}
