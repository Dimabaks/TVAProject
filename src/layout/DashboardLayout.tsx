import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

export default function DashboardLayout() {
	const location = useLocation();
	return (
		<div className="flex min-h-screen">
			<Sidebar />

			<div className="flex flex-col flex-1">
				{location.pathname.includes("drivers") ? "" : <Header />}
				<main
					className={`${location.pathname.includes("drivers") ? "" : "flex-1 p-2"}`}>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
