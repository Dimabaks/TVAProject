import Button from "./Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
	return (
		<div className="flex flex-col min-h-screen w-2xs bg-white border-gray-500 border-r-1 ">
			<div className="flex justify-between relative border-gray-500 border-b-1 pt-3 pb-3 pl-5">
				<span className="font-bold text-2xl">TVA</span>
				<button className="absolute right-0 cursor-pointer top-4">
					<ArrowBackIosIcon />
				</button>
			</div>
			<div className="flex flex-col gap-6 mt-10 pl-5 flex-1">
				<NavLink to="/companies">
					<ApartmentIcon />
					Companies
				</NavLink>
				<NavLink to="/tasks">
					<AddTaskIcon />
					Tasks
				</NavLink>

				<div className="mt-auto pb-10 pr-5">
					<Button>Logout</Button>
				</div>
			</div>
		</div>
	);
}
