import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import DashboardLayout from "./layout/DashboardLayout";
import Companies from "./pages/Companies/Companies";
import Tasks from "./pages/Tasks/Tasks";

const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		element: <DashboardLayout />,
		children: [
			{ index: true, element: <Companies /> },
			{ path: "/companies", element: <Companies /> },
			{ path: "/tasks", element: <Tasks /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
