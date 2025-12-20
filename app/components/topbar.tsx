import { Separator } from "@radix-ui/react-separator";
import { AutoBreadcrumb } from "./auto-breadcrumb";
import ModeToggle from "./mode-toggle";
import { Button } from "./ui/button";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

export function Topbar() {
	return (
		<header
			className="
    h-16 lg:h-18
    flex items-center
    gap-3
    px-3 sm:px-6
    bg-[var(--topbar-bg)]
    text-[var(--topbar-text)]
    border-b
  "
		>
			<div
				className="
          flex items-center gap-3
          w-full
          sm:w-auto
          sm:justify-start
          lg:ml-24   /* PCでは左寄り中央 */
        "
			>
				<Button
					variant="outline"
					asChild
					className="
            h-14 px-5
            rounded-2xl
            shadow-sm
            flex items-center gap-2
            bg-white/80
            hover:bg-white
          "
				>
					<Link href="/">
						<FaHome className="h-6 w-6" />
						<span className="text-base lg:text-lg font-semibold">
							RRiverWest
						</span>
					</Link>
				</Button>

				<div className="h-14 flex items-center">
					<ModeToggle />
				</div>
			</div>

			<div className="hidden sm:flex ml-auto">
				<AutoBreadcrumb />
			</div>
		</header>
	);
}
