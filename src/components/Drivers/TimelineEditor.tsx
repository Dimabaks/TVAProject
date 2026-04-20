import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type { LogTimeline } from "../../types/Log.types";
import type { Driver } from "../../types/Drivers.types";
import getDayWindow from "../../utils/timeline";

type Props = {
	driver: Driver;
	timeline: LogTimeline[];
	selectedIds: number[];
	onToggleSelected: (id: number) => void;
	onDeleteOne: (id: number) => void;
	onToggleSelectedAll: () => void;
	onOpenModal: (id: number) => void;
	date: Date;
};

const now = Date.now();

export default function TimelineEditor({
	driver,
	timeline,
	selectedIds,
	onToggleSelected,
	onDeleteOne,
	onToggleSelectedAll,
	onOpenModal,
	date,
}: Props) {
	function formatMinutes(ms: number) {
		const totalMinutes = Math.floor(ms / 60000);
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`;
	}

	const statusColors: Record<string, string> = {
		driving: "bg-green-50 text-green-700",
		"on duty": "bg-amber-50 text-amber-700",
		break: "bg-orange-50 text-orange-700",
		"off duty": "bg-gray-100 text-gray-600",
	};

	const { startMs, endMs } = getDayWindow(date);
	const filteredTimeline = timeline.filter((seg) => {
		const segEnd = seg.end ?? now;
		return seg.start < endMs && segEnd > startMs;
	});

	return (
		<div className="border-t border-gray-100">
			<table className="w-full border-collapse text-sm">
				<thead>
					<tr className="border-b border-gray-100">
						<th className="px-4 py-2 w-8">
							<input
								type="checkbox"
								checked={
									timeline.length > 0 && selectedIds.length === timeline.length
								}
								className="cursor-pointer"
								onChange={onToggleSelectedAll}
							/>
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Time
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Duration
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Event
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Status
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Location
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Odometer
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Engine
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Notes
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Origin
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							ID
						</th>
						<th className="px-4 py-2 w-20"></th>
					</tr>
				</thead>
				<tbody>
					{filteredTimeline.map((seg) => (
						<tr
							key={seg.id}
							className={`border-b border-gray-100 transition-colors ${selectedIds.includes(seg.id) ? "bg-green-50" : "hover:bg-gray-50"}`}>
							<td className="px-4 py-3">
								<input
									type="checkbox"
									className="cursor-pointer"
									checked={selectedIds.includes(seg.id)}
									onChange={() => onToggleSelected(seg.id)}
								/>
							</td>
							<td className="px-4 py-3 text-gray-900">
								{new Date(seg.start).toLocaleString()}
							</td>
							<td className="px-4 py-3 text-gray-500">
								{formatMinutes(seg.end - seg.start)}
							</td>
							<td className="px-4 py-3">
								<span
									className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[seg.status] || "bg-gray-100 text-gray-600"}`}>
									{seg.status}
								</span>
							</td>
							<td className="px-4 py-3 text-gray-500">{driver.connection}</td>
							<td className="px-4 py-3 text-gray-500">
								{driver.lastLocation || "—"}
							</td>
							<td className="px-4 py-3 text-gray-400">—</td>
							<td className="px-4 py-3 text-gray-400">—</td>
							<td className="px-4 py-3 text-gray-400">—</td>
							<td className="px-4 py-3 text-gray-400">—</td>
							<td className="px-4 py-3 text-gray-500">{driver.id}</td>
							<td className="px-4 py-3">
								<div className="flex items-center gap-1 justify-end">
									<button
										className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
										onClick={() => onOpenModal(seg.id)}>
										<EditOutlinedIcon sx={{ fontSize: 16 }} />
									</button>
									<button
										className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
										onClick={() => onDeleteOne(seg.id)}>
										<DeleteOutlineOutlinedIcon sx={{ fontSize: 16 }} />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
