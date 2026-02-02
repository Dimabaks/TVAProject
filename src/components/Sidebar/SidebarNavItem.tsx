import { NavLink } from "react-router-dom";
import type { SidebarProps } from "./Sidebar.types";

export default function SidebarNavItem({
	to,
	icon,
	label,
	collapsed,
}: SidebarProps) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) => `w-full
				flex items-center gap-3
				px-4 py-3
				rounded-none
				transition-colors
				 ${isActive ? "bg-green-200 w-full" : "hover:bg-gray-100"}`}>
			{icon}
			{!collapsed && <span>{label}</span>}
		</NavLink>
	);
}
