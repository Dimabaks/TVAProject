import { formatMinutes, percent } from "../utils/hos";

type Props = {
	used: number;
	limit: number;
	barClassName: string;
};

export default function LinearStatus({ used, limit, barClassName }: Props) {
	const percents = percent(used, limit);

	return (
		<div className="flex flex-col items-center gap-2 w-full">
			<span className="text-xs whitespace-nowrap">{formatMinutes(used)}</span>
			<div className="h-2 w-full bg-gray-200 rounded">
				<div
					className={`h-2 rounded ${barClassName}`}
					style={{ width: `${percents}%` }}
				/>
			</div>
		</div>
	);
}
