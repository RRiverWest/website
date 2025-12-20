import React from "react"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Topbar } from "@/components/topbar";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div>
						<Topbar />

						{/* ① 画面端との余白 */}
						<div className="w-full px-2 sm:px-2 lg:px-4 py-6">
							{/* ② 枠：幅650px固定 + border */}
							<main
								className="
									mx-auto
									sm:w-11/12
									lg:w-[750px]
									px-2
									sm:px-2
									lg:px-4
									py-2
                  border
                  border-border
                  rounded-xl
                  bg-card
                "
							>
								{/* ③ MDX */}
								<div
									className="
                    prose
										max-w-none
                    dark:prose-invert
                    p-6

                    /* 折り返し */
                    break-words
                    overflow-wrap-anywhere
                    [word-break:break-word]

                    /* hr を端まで */
                    prose-hr:max-w-none
                    prose-hr:mx-0
                    prose-hr:border-border

                    /* code block 折り返し */
                    prose-pre:whitespace-pre-wrap
                    prose-pre:break-words
                  "
								>
									{children}
								</div>
							</main>
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
