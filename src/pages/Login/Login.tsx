import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type LoginForm = {
	email: string;
	password: string;
};

export default function Login() {
	const [visible, setVisible] = useState(false);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>();

	const onSubmit = (data: LoginForm) => {
		console.log("Логин прошел", data);
		localStorage.setItem("user", JSON.stringify(data));
		navigate("/companies");
	};
	return (
		<div className="min-h-screen flex bg-amber-300">
			<form
				action=""
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col items-center gap-4 bg-amber-500 max-w-lg w-full m-auto px-15 py-25 rounded-xl">
				<h1 className="font-bold text-2xl">Log in to your account</h1>
				<div className="flex flex-col gap-1 w-full">
					<label htmlFor="email" className="text-sm font-medium">
						Email*
					</label>
					<input
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^\S+@\S+$/i,
								message: "Email formatt is invalid",
							},
						})}
						type="email"
						placeholder="Enter email"
						className="w-full p-2 rounded-md"
					/>
					{errors.email && (
						<span className="text-red-500">{errors.email.message}</span>
					)}
				</div>
				<div className="flex flex-col gap-1 w-full relative">
					<label htmlFor="password" className="text-sm font-medium">
						Password*
					</label>
					<input
						{...register("password", {
							required: "Password is required",
							minLength: { value: 6, message: "Minimum 6 characters" },
						})}
						type={visible ? "text" : "password"}
						placeholder="Enter password"
						className="w-full p-2 rounded-md "
					/>
					{errors.password && (
						<span className="text-red-500">{errors.password.message}</span>
					)}
					<button
						className="absolute right-2 top-7 text-gray-500"
						type="button"
						onClick={() => setVisible(!visible)}>
						{visible ?
							<Visibility />
						:	<VisibilityOff />}
					</button>
				</div>
				<Button type="submit" className="bg-white p-2 hover:scale-105 mt-10">
					Login
				</Button>
			</form>
		</div>
	);
}
