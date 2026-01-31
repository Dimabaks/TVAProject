type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: string;
};

export default function Button({
	className = "",
	children,
	...props
}: ButtonProps) {
	const baseButton = "rounded-2xl w-full cursor-pointer";

	return (
		<button className={`${baseButton} ${className}`} {...props}>
			{children}
		</button>
	);
}
