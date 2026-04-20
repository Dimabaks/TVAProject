import { useMatches, type UIMatch } from "react-router-dom";

type RouteHandle = {
	title?: string;
};

export default function Header() {
	const matches = useMatches() as UIMatch<unknown, RouteHandle>[];
	const currentTitle =
		matches
			.slice()
			.reverse()
			.find((match) => match.handle?.title)?.handle.title ?? "Companies";

	return (
		<div className="h-14 bg-white border-b border-gray-100 w-full flex items-center justify-between px-6">
			<span className="font-medium text-gray-900 text-base">
				{currentTitle}
			</span>
		</div>
	);
}
