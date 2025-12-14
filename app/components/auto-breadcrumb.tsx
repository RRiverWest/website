"use client"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import Link from "next/link"
import React from "react"

export function AutoBreadcrumb() {
	const pathname = usePathname()
	const segments = pathname.split("/").filter(Boolean)

	return (

		<Breadcrumb className="text-base">
			<BreadcrumbList className="text-base">
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/">Home</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>

				{segments.map((segment, index) => {
					const href = "/" + segments.slice(0, index + 1).join("/")
					const label = decodeURIComponent(segment)
					const isLast = index === segments.length - 1

					return (
						<React.Fragment key={href}>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								{isLast ? (
									<BreadcrumbPage>{label}</BreadcrumbPage>
								) : (
									<BreadcrumbLink asChild>
										<Link href={href}>{label}</Link>
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
						</React.Fragment>
					)
				})}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
