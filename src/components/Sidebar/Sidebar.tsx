import Button from "../Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AddTaskIcon from "@mui/icons-material/AddTask";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import SidebarNavItem from "./SidebarNavItem";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
	const [collapsed, setCollapsed] = useState(true);
	const navigate = useNavigate();

	return (
		<div
			className={`flex flex-col min-h-screen bg-white border-gray-300 border-r-1 transition-all duration-300 ${collapsed ? "w-15" : "min-w-50"}`}>
			<div
				className={`flex  relative border-gray-300 border-b-1 h-14 items-center ${collapsed} ? "justify-center px-0" : "justify-between px-2 "`}>
				<span
					className={`font-bold transition-all duration-300 ${
						collapsed ? "" : "text-2xl"
					}`}>
					<img
						src="../../src/img/logo.png"
						alt="Logo"
						className={`rounded-xl bg-gray-500 transition-all ${collapsed ? "w-10" : "w-12"}`}
					/>
				</span>
				<button
					className="absolute right-0 cursor-pointer top-4"
					onClick={() => setCollapsed((prev) => !prev)}>
					{collapsed ?
						<ArrowForwardIosIcon fontSize="small" className="pl-2" />
					:	<ArrowBackIosIcon />}
				</button>
			</div>
			<div className="flex flex-col gap-1 mt-10 flex-1  w-full">
				<SidebarNavItem
					to="/companies"
					icon={<ApartmentIcon />}
					label="Companies"
					collapsed={collapsed}
				/>
				<SidebarNavItem
					to="/tasks"
					icon={<AddTaskIcon />}
					label="Tasks"
					collapsed={collapsed}
				/>

				<div className="mt-auto pb-10 ">
					<Button onClick={() => navigate("/login")}>
						<LogoutIcon />
						{!collapsed && <span>Logout</span>}
					</Button>
				</div>
			</div>
		</div>
	);
}
