import Button from "../Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AddTaskIcon from "@mui/icons-material/AddTask";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import SidebarNavItem from "./SidebarNavItem";

export default function Sidebar() {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<div
			className={`flex flex-col min-h-screen bg-white border-gray-300 border-r-1 transition-all duration-300 ${collapsed ? "w-15" : "min-w-3xs"}`}>
			<div className="flex justify-between relative border-gray-300 border-b-1 pt-3 pb-3 pl-5 h-14">
				<span
					className={`font-bold transition-all duration-300 ${
						collapsed ? "text-xs pt-2" : "text-2xl"
					}`}>
					TVA
				</span>
				<button
					className="absolute right-0 cursor-pointer top-4"
					onClick={() => setCollapsed((prev) => !prev)}>
					{collapsed ?
						<ArrowForwardIosIcon />
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
					<Button>
						<LogoutIcon />
						{!collapsed && <span>Logout</span>}
					</Button>
				</div>
			</div>
		</div>
	);
}
