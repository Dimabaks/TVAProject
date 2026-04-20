import type { LogStatus, LogTimeline } from "../types/Log.types";
import getDayWindow from "../utils/timeline";

type Props = {
	timeline: LogTimeline[];
	date: Date;
};

const STATUS_ROW: Record<LogStatus, number> = {
	"off duty": 0,
	break: 1,
	driving: 2,
	"on duty": 3,
};

const ROW_LABEL: Record<LogStatus, string> = {
	"off duty": "OFF",
	break: "SB",
	driving: "D",
	"on duty": "ON",
};

const STATUS_COLOR: Record<LogStatus, string> = {
	"off duty": "bg-gray-400",
	break: "bg-orange-500",
	driving: "bg-green-500",
	"on duty": "bg-amber-500",
};

const GRID_BG =
	"repeating-linear-gradient(to right, rgba(0,0,0,0.06) 0, rgba(0,0,0,0.06) 1px, transparent 1px, transparent calc(100%/96))," +
	"repeating-linear-gradient(to right, rgba(0,0,0,0.14) 0, rgba(0,0,0,0.14) 1px, transparent 1px, transparent calc(100%/24))," +
	"repeating-linear-gradient(to bottom, rgba(0,0,0,0.10) 0, rgba(0,0,0,0.10) 1px, transparent 1px, transparent calc(100%/4))";

const now = Date.now();

export default function DriverGraphic({ timeline, date }: Props) {
	const { startMs, endMs } = getDayWindow(date);
	const dayDuration = endMs - startMs;

	const parts = timeline
		.map((seg) => {
			const clippedStart = Math.max(seg.start, startMs);
			const clippedEnd =
				seg.end === null ?
					Math.min(now, endMs)
				:	Math.min(Number(seg.end), endMs);
			const duration = clippedEnd - clippedStart;
			if (duration <= 0) return null;

			const left = ((clippedStart - startMs) / dayDuration) * 100;
			const width = (duration / dayDuration) * 100;

			return {
				id: seg.id,
				status: seg.status,
				row: STATUS_ROW[seg.status],
				left,
				width,
			};
		})
		.filter(Boolean) as {
		id: number;
		status: LogStatus;
		row: number;
		left: number;
		width: number;
	}[];

	return (
		<div className="w-full max-w-7xl">
			<div className="flex">
				<div className="w-14 text-xs text-gray-600 flex flex-col items-center py-2">
					<div className="h-10 flex items-center">{ROW_LABEL["off duty"]}</div>
					<div className="h-10 flex items-center">{ROW_LABEL["break"]}</div>
					<div className="h-10 flex items-center">{ROW_LABEL["driving"]}</div>
					<div className="h-10 flex items-center">{ROW_LABEL["on duty"]}</div>
				</div>

				<div
					className="relative flex-1 h-[160px] rounded bg-white "
					style={{ backgroundImage: GRID_BG }}>
					<div className="absolute -top-5 left-0 right-0 h-4 text-[10px] text-gray-500">
						{Array.from({ length: 25 }, (_, i) => (
							<span
								key={i}
								className="absolute -translate-x-1/2"
								style={{ left: `${(i / 24) * 100}%` }}>
								{i}
							</span>
						))}
					</div>

					<div className="absolute inset-0 grid grid-rows-4">
						<div className="relative h-full" />
						<div className="relative h-full" />
						<div className="relative h-full" />
						<div className="relative h-full" />
					</div>

					{parts.map((p) => (
						<div
							key={p.id}
							className={`absolute ${STATUS_COLOR[p.status]} rounded`}
							style={{
								left: `${p.left}%`,
								width: `${p.width}%`,
								top: `calc(${p.row} * 25% + 50%/4 - 2px)`,
								height: "6px",
							}}
							title={p.status}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
