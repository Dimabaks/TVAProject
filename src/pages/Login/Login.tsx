import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

type LoginForm = {
	email: string;
	password: string;
};

export default function Login() {
	const [visible, setVisible] = useState(false);
	return (
		<div className="min-h-screen flex bg-amber-300">
			<form
				action=""
				className="flex flex-col items-center gap-4 bg-amber-500 max-w-lg w-full m-auto px-15 py-25 rounded-xl">
				<h1 className="font-bold text-2xl">Log in to your account</h1>
				<div className="flex flex-col gap-1 w-full">
					<label htmlFor="email" className="text-sm font-medium">
						Email*
					</label>
					<input
						type="email"
						name="email"
						placeholder="Enter email"
						className="w-full p-2 rounded-md"
						required
					/>
				</div>
				<div className="flex flex-col gap-1 w-full relative">
					<label htmlFor="password" className="text-sm font-medium">
						Password*
					</label>
					<input
						type={visible ? "text" : "password"}
						name="password"
						placeholder="Enter password"
						className="w-full p-2 rounded-md "
						required
					/>
					<button
						className="absolute right-2 top-7 text-gray-500"
						onClick={() => setVisible(!visible)}>
						{visible ?
							<Visibility />
						:	<VisibilityOff />}
					</button>
				</div>
				<button
					className="bg-white p-2 rounded-2xl w-full cursor-pointer hover:scale-105 mt-10"
					type="submit">
					Login
				</button>
			</form>
		</div>
	);
}
