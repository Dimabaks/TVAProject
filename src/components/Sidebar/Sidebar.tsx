import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AddTaskIcon from "@mui/icons-material/AddTask";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SidebarNavItem from "./SidebarNavItem";

export default function Sidebar() {
	const [collapsed, setCollapsed] = useState(true);
	const navigate = useNavigate();

	return (
		<div
			className={`flex flex-col min-h-screen bg-white border-r border-gray-100 transition-all duration-300 relative ${collapsed ? "w-16" : "w-56"}`}>
			<button
				className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer transition-colors z-10"
				onClick={() => setCollapsed((prev) => !prev)}>
				{collapsed ?
					<ArrowForwardIosIcon sx={{ fontSize: 10 }} />
				:	<ArrowBackIosIcon sx={{ fontSize: 10 }} />}
			</button>

			<div
				className={`flex items-center ${collapsed ? "justify-center" : "justify-start"} h-14 px-3 border-b border-gray-100`}>
				<div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
					<img src="../../src/img/logo.png" alt="Logo" className="w-6 h-6" />
				</div>
				{!collapsed && (
					<span className="font-medium text-gray-900 text-sm whitespace-nowrap ml-3">
						TVA Logbook
					</span>
				)}
			</div>

			<div className="flex flex-col gap-1 mt-3 flex-1 px-2">
				<SidebarNavItem
					to="/companies"
					icon={<ApartmentIcon sx={{ fontSize: 18 }} />}
					label="Companies"
					collapsed={collapsed}
				/>
				<SidebarNavItem
					to="/tasks"
					icon={<AddTaskIcon sx={{ fontSize: 18 }} />}
					label="Tasks"
					collapsed={collapsed}
				/>
			</div>

			<div className="pb-4 px-2 border-t border-gray-100 pt-3">
				<button
					onClick={() => navigate("/login")}
					className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer text-sm ${collapsed ? "justify-center" : ""}`}>
					<LogoutIcon sx={{ fontSize: 18 }} />
					{!collapsed && <span>Logout</span>}
				</button>
			</div>
		</div>
	);
}
