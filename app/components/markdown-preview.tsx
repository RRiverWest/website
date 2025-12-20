import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import slugify from '@sindresorhus/slugify';

function slugify(children: React.ReactNode): string {
  return String(children ?? "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-ぁ-んァ-ヶ一-龠]/g, "")
}

interface markdownPreviewProps {
	markdownData: string
}
export default function MarkdownPreview({ markdownData }: markdownPreviewProps) {
	return (
		<div className="prose prose-lg dark:prose-invert border border-border">

			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					h2: ({ node, ...props }) => (
						<h2 id={slugify(props.children)} {...props} />
					),
					h3: ({ node, ...props }) => (
						<h3 id={slugify(props.children)} {...props} />
					),
				}}
			>
				{markdownData}
			</ReactMarkdown>
		</div>

	);
}
