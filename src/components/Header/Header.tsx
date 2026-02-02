import { useMatches, type UIMatch } from "react-router-dom";

type RouteHandle = {
	title?: string;
};

export default function Header() {
	const matches = useMatches() as UIMatch<unknown, RouteHandle>[];
	console.log(matches);
	const currentTitle =
		matches
			.slice()
			.reverse()
			.find((match) => match.handle?.title)?.handle.title ?? "";
	return (
		<div className="h-14 border-gray-300 border-b-1 w-full flex items-center font-semibold px-5 text-xl">
			{currentTitle}
		</div>
	);
}
