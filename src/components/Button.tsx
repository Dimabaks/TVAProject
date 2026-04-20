type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: string;
	variant?: "primary" | "ghost" | "danger";
};

export default function Button({
	className = "",
	variant = "primary",
	children,
	...props
}: ButtonProps) {
	const variants = {
		primary: "bg-green-600 text-white hover:bg-green-700",
		ghost:
			"bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-gray-200",
		danger: "bg-transparent text-red-500 hover:bg-red-50 border border-red-200",
	};

	return (
		<button
			className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${variants[variant]} ${className}`}
			{...props}>
			{children}
		</button>
	);
}
