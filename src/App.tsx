import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";

const router = createBrowserRouter([
	{
		index: true,
		element: <Login />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
