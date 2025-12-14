import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface markdownPreviewProps {
	markdownData: string
}

export default function MarkdownPreview({ markdownData }: markdownPreviewProps) {
	return (
		<div className="prose prose-lg dark:prose-invert">
			<ReactMarkdown remarkPlugins={[remarkGfm]}>
				{markdownData}
			</ReactMarkdown>
		</div>
	);
}
