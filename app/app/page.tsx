import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getMarkdown } from "@/lib/getMarkdown";

export default async function HomePage() {
	const md = await getMarkdown("home.md");

	return (
		<div className="prose prose-lg dark:prose-invert">
			<ReactMarkdown remarkPlugins={[remarkGfm]}>
				{md}
			</ReactMarkdown>
		</div>
	);
}
