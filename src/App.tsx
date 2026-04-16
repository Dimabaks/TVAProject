import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import DashboardLayout from "./layout/DashboardLayout";
import Companies from "./pages/Companies/Companies";
import Tasks from "./pages/Tasks/Tasks";
import { DriverDetails } from "./pages/Drivers/DriverDetails";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		element: (
			<ProtectedRoute>
				<DashboardLayout />
			</ProtectedRoute>
		),
		children: [
			{ index: true, element: <Companies /> },
			{
				path: "companies",
				element: <Companies />,
				handle: { title: "Companies" },
			},
			{ path: "tasks", element: <Tasks />, handle: { title: "Tasks" } },
			{
				path: "drivers/:driverId",
				element: <DriverDetails />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
