"use client"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from "@/components/ui/sidebar"
import useWindowResize from "@/hooks/use-windown-resize";
import { useState, useEffect } from "react";

interface sidebarItem {
	title: string;
	path: string;
}

const home: sidebarItem = {
	title: "Home",
	path: "/"
}

const blog: sidebarItem = {
	title: "Blog",
	path: "/blog"
}


export function AppSidebar

	({ children }: Readonly<{
		children: React.ReactNode;
	}>) {
	const { isVertical } = useWindowResize();
	const [open, setOpen] = useState<boolean>();

	useEffect(() => {
		setOpen(!isVertical);
	}, [isVertical])

	return (
		<SidebarProvider open={open} onOpenChange={setOpen}>
			<Sidebar>
				<SidebarHeader />
				<SidebarContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<a href={home.path}>{home.title}</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<a href={blog.path}>{blog.title}</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarContent>
			</Sidebar>
			<main className="flex-1 min-w-0 flex flex-col">
				{children}
			</main>
		</SidebarProvider>
	)
}
