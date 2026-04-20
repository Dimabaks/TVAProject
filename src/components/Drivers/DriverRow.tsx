import { useNavigate } from "react-router-dom";
import type { Driver } from "../../types/Drivers.types";
import DeleteIcon from "@mui/icons-material/Delete";
import { buildHosSummary } from "../../utils/hos";
import LinearStatus from "../LinearStatus";
import DeleteConfirmModal from "../Modals/DeleteConfirmModal";
import { useState } from "react";
import { deleteDriver } from "../../api/drivers";

type Props = { driver: Driver; onRefresh: () => void };

export function DriverRow({ driver, onRefresh }: Props) {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const hos = buildHosSummary(driver.timeline);

	const lastSegment =
		driver.timeline.length > 0 ?
			driver.timeline.reduce((latest, seg) => {
				if (seg.end > latest.end) {
					return seg;
				}
				return latest;
			})
		:	null;

	const currentStatus = lastSegment?.status ?? "off duty";

	return (
		<>
			<tr
				className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
				onClick={(e) => {
					const target = e.target as HTMLElement;
					if (target.closest("button")) return;
					navigate(`/drivers/${driver.id}`);
				}}>
				<td className="px-4 py-3 text-sm font-medium text-gray-900">
					{driver.name}
				</td>
				<td className="px-4 py-3 text-sm text-gray-500">{driver.vehicle}</td>
				<td className="px-4 py-3">
					<span
						className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                        ${
													currentStatus === "driving" ?
														"bg-green-50 text-green-700"
													: currentStatus === "on duty" ?
														"bg-amber-50 text-amber-700"
													: currentStatus === "break" ?
														"bg-orange-50 text-orange-700"
													:	"bg-gray-100 text-gray-600"
												}`}>
						{currentStatus}
					</span>
				</td>
				<td className="px-4 py-3 text-sm text-gray-500 truncate max-w-xs">
					{driver.lastLocation || "—"}
				</td>
				<td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
					{driver.lastUpdate || "—"}
				</td>
				<td className="px-4 py-3">
					<span
						className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                        ${
													driver.connection === "connected" ?
														"bg-green-50 text-green-700"
													:	"bg-red-50 text-red-700"
												}`}>
						<span
							className={`w-1.5 h-1.5 rounded-full ${driver.connection === "connected" ? "bg-green-500" : "bg-red-500"}`}
						/>
						{driver.connection}
					</span>
				</td>
				<td className="px-4 py-3 text-sm text-gray-400">—</td>
				<td className="px-4 py-3 text-sm text-gray-400">—</td>
				<td className="px-4 py-3">
					<LinearStatus
						used={hos.break.limit - hos.break.used}
						limit={hos.break.limit}
						barClassName="bg-orange-500"
					/>
				</td>
				<td className="px-4 py-3">
					<LinearStatus
						used={hos.drive.limit - hos.drive.used}
						limit={hos.drive.limit}
						barClassName="bg-green-500"
					/>
				</td>
				<td className="px-4 py-3">
					<LinearStatus
						used={hos.shift.limit - hos.shift.used}
						limit={hos.shift.limit}
						barClassName="bg-purple-500"
					/>
				</td>
				<td className="px-4 py-3">
					<LinearStatus
						used={hos.cycle.limit - hos.cycle.used}
						limit={hos.cycle.limit}
						barClassName="bg-red-500"
					/>
				</td>
				<td className="px-4 py-3">
					<button
						className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
						onClick={() => setIsModalOpen(true)}>
						<DeleteIcon sx={{ fontSize: 16 }} />
					</button>
				</td>
			</tr>
			<DeleteConfirmModal
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={async () => {
					await deleteDriver(driver.id);
					onRefresh();
					setIsModalOpen(false);
				}}
				message={`Are you sure that you want to delete driver ${driver.name}?`}
			/>
		</>
	);
}
