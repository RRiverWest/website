'use client'
import useWindowResize from "@/hooks/use-windown-resize";

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	const isVirtual = useWindowResize();
	return (
		<div>
			{children}
		</div>
	);
}
