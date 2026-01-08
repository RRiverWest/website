import { AutoBreadcrumb } from "./auto-breadcrumb";
import ModeToggle from "./mode-toggle";
import { Button } from "./ui/button";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { NavigationMenuDemo } from "./navigation-menu-demo";

export function Topbar() {
	return (
		<header
			className="
        relative
        flex items-center
				justify-between
				py-3
        w-full
        px-3 sm:px-6
        bg-[var(--topbar-bg)]
        text-[var(--topbar-text)]
        border-b
      "
		>
			{/* 左側 */}
			<div className="flex items-center gap-3">
				<Button
					variant="secondary"
					asChild
					className="
            h-9 px-4 sm:px-5
            rounded-2xl
            bg-background hover:bg-accent
						text-foreground hover:text-background
            shadow-sm
						hidden
            lg:flex items-center gap-2
						border
						border-accent
          "
				>
					<Link href="/">
						<FaHome className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
						<span className="text-sm sm:text-base lg:text-lg font-semibold">
							RRiverWest
						</span>
					</Link>
				</Button>
				<ModeToggle />
			</div>

			{/* 中央 NavigationMenu */}
			<div className="grow place-items-center">
				<NavigationMenuDemo />
			</div>

			{/* 右側 */}
			<div className="ml-auto hidden sm:flex">
				<AutoBreadcrumb />
			</div>
		</header>
	)
}
