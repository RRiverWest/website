import { Separator } from "@radix-ui/react-separator";
import { AutoBreadcrumb } from "./auto-breadcrumb";
import ModeToggle from "./mode-toggle";
import { SidebarTrigger } from "./ui/sidebar";


export function Topbar() {
	return (
		<div className="flex border border-border w-full  gap-3">
			<SidebarTrigger />
			<Separator orientation='vertical' className='h-6' />
			<ModeToggle />
			<AutoBreadcrumb />
		</div>
	);
}
