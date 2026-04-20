import { NavLink } from "react-router-dom";

type SidebarProps = {
	to: string;
	icon: React.ReactNode;
	label: string;
	collapsed: boolean;
};

export default function SidebarNavItem({
	to,
	icon,
	label,
	collapsed,
}: SidebarProps) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm
                ${
									isActive ?
										"bg-green-50 text-green-700 font-medium"
									:	"text-gray-500 hover:text-gray-900 hover:bg-gray-50"
								}
                ${collapsed ? "justify-center" : ""}`
			}>
			{icon}
			{!collapsed && <span>{label}</span>}
		</NavLink>
	);
}
