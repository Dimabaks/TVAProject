import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

export default function DashboardLayout() {
	return (
		<div className="flex min-h-screen">
			<Sidebar />

			<div className="flex flex-col flex-1">
				<Header />

				<main className="flex-1 p-2">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
