import searchFiles from "@/lib/searchPath";
import { getMarkdown } from "@/lib/getMarkdown";
import MarkdownPreview from "@/components/markdown-preview";

export default function Blog() {
	console.log(searchFiles());
	const md = getMarkdown("blog/home.md");
	return (
		<MarkdownPreview markdownData={md} />
	)
}
