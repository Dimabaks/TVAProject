import type { ReactNode } from "react";

export type SidebarProps = {
	to: string;
	icon: ReactNode;
	label: string;
	collapsed: boolean;
};
