"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"
import { FaLinux } from "react-icons/fa";
import { SiNeovim } from "react-icons/si";
import { FaComputer } from "react-icons/fa6";

import { useIsMobile } from "@/hooks/use-mobile"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const blogs: { title: string; href: string; description: string }[] = [
	{
		title: "日常",
		href: "/blog/diary",
		description: "日々のつぶやき",
	},
	{
		title: "アニメ",
		href: "/blog/anime",
		description: "視聴したアニメの感想や記録",
	},
	{
		title: "バイク",
		href: "/blog/moto",
		description: "ツーリングや整備のメモ",
	},
]

export function NavigationMenuDemo() {
	const isMobile = useIsMobile()

	return (
		<NavigationMenu viewport={isMobile}>
			<NavigationMenuList className="flex-wrap">
				<NavigationMenuItem>
					<NavigationMenuTrigger>Home</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<Link
										className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
										href="/about/me"
									>
										<div className="mb-2 text-lg font-medium sm:mt-4">
											RRiverWest
										</div>
										<p className="text-muted-foreground text-sm leading-tight">しがない高専生</p>
									</Link>
								</NavigationMenuLink>
							</li>
							<ListItem href="/about/privarcy" title="プライバシーポリシー">
								How to install dependencies and structure your app.
							</ListItem>
							<ListItem href="/about/site" title="このサイトについて">
								Styles for headings, paragraphs, lists...etc
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger>プログラミング</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[200px] gap-4">
							<li>
								<NavigationMenuLink asChild>
									<Link href="/tech/linux" className="flex-row items-center gap-2">
										<FaLinux />
										Linux
									</Link>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<Link href="/tech/editor" className="flex-row items-center gap-2">
										<SiNeovim />
										Editor
									</Link>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<Link href="/tech/other" className="flex-row items-center gap-2">
										<FaComputer />
										Other
									</Link>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuTrigger>趣味＆日常</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
							{blogs.map((blog) => (
								<ListItem
									key={blog.title}
									title={blog.title}
									href={blog.href}
								>
									{blog.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

function ListItem({
	title,
	children,
	href,
	...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link href={href}>
					<div className="text-base leading-none font-medium">{title}</div>
					<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	)
}
