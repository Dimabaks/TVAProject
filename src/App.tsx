import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import DashboardLayout from "./layout/DashboardLayout";
import Companies from "./pages/Companies/Companies";
import Tasks from "./pages/Tasks/Tasks";
import { DriverDetails } from "./components/Drivers/DriverDetails";

const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		element: <DashboardLayout />,
		children: [
			{ index: true, element: <Companies /> },
			{
				path: "/companies",
				element: <Companies />,
				handle: { title: "Companies" },
			},
			{ path: "/tasks", element: <Tasks />, handle: { title: "Tasks" } },
			{ path: "drivers/:driverId", element: <DriverDetails /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
