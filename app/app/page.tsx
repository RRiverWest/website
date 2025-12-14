import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownPreview from "@/components/markdown-preview";
import { getMarkdown } from "@/lib/getMarkdown";

export default function HomePage() {
	return (
		<div>
			<MarkdownPreview markdownData={getMarkdown("home.md")} />
		</div>
	);
}
