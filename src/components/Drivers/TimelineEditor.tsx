import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimerIcon from "@mui/icons-material/Timer";
import EventIcon from "@mui/icons-material/Event";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type { LogTimeline } from "../../types/Log.types";
import type { Driver } from "../../types/Drivers.types";

type Props = {
	driver: Driver;
	timeline: LogTimeline[];
	selectedIds: string[];
	onToggleSelected: (id: string) => void;
	onDeleteOne: (id: string) => void;
	onToggleSelectedAll: () => void;
	onOpenModal: (id: string) => void;
};

export default function TimelineEditor({
	driver,
	timeline,
	selectedIds,
	onToggleSelected,
	onDeleteOne,
	onToggleSelectedAll,
	onOpenModal,
}: Props) {
	function formatMinutes(ms: number) {
		const totalMinutes = Math.floor(ms / 60000);
		const hours = Math.floor(totalMinutes / 60); //130 / 60 = 2
		const minutes = totalMinutes % 60; // 70 % 60 = 10 так как 70 / 60 = 1 70-60 = 10

		const hh = String(hours).padStart(2, "0");
		const mm = String(minutes).padStart(2, "0");

		return `${hh}h ${mm}m`;
	}

	return (
		<div>
			<table className="w-full text-sm border-collapse border-spacing-y-2">
				<thead className="">
					<tr className="">
						<th className="px-2 py-1 ">
							<input
								type="checkbox"
								checked={
									timeline.length > 0 && selectedIds.length === timeline.length
								}
								className="cursor-pointer"
								onChange={onToggleSelectedAll}
							/>
						</th>
						<th className="px-2 py-1">
							<AccessTimeIcon fontSize="small" />
							Time
						</th>
						<th className="px-2 py-1">
							<TimerIcon fontSize="small" />
							Duration
						</th>
						<th className="px-2 py-1">
							<EventIcon fontSize="small" />
							Event
						</th>
						<th className="px-2 py-1">
							<AutorenewIcon fontSize="small" />
							Status
						</th>
						<th className="px-2 py-1">
							<LocationPinIcon fontSize="small" />
							Location
						</th>
						<th className="px-2 py-1">
							<ElectricCarIcon fontSize="small" />
							Odometr
						</th>
						<th className="px-2 py-1">
							<EngineeringOutlinedIcon fontSize="small" />
							Engine
						</th>
						<th className="px-2 py-1">
							<SpeakerNotesOutlinedIcon fontSize="small" />
							Notes
						</th>
						<th className="px-2 py-1">Origin</th>
						<th className="px-2 py-1">
							<BadgeIcon fontSize="small" />
							Id
						</th>
						<th className="w-24 px-2 py-1">Actions</th>
					</tr>
				</thead>
				<tbody className="w-full text-center">
					{timeline.map((seg) => (
						<tr
							key={seg.id}
							className={`border-b border-gray-300 ${selectedIds.includes(seg.id) ? "bg-green-100" : ""}`}>
							<td className="px-2 py-3">
								<input
									type="checkbox"
									className="cursor-pointer"
									checked={selectedIds.includes(seg.id)}
									onChange={() => onToggleSelected(seg.id)}
								/>
							</td>
							<td className="px-2 py-3">{`${new Date(seg.start).toLocaleString()}`}</td>
							<td className="px-2 py-3">
								{formatMinutes(seg.end - seg.start)}
							</td>
							<td className="px-2 py-3">{seg.status}</td>
							<td className="px-2 py-3">{driver.connection}</td>
							<td className="px-2 py-3">{driver.lastLocation}</td>
							<td className="px-2 py-3">-</td>
							<td className="px-2 py-3">-</td>
							<td className="px-2 py-3">-</td>
							<td className="px-2 py-3">-</td>
							<td className="px-2 py-3">{driver.id}</td>
							<td className="w-24 px-2 py-3">
								<div className="flex gap-1 justify-center">
									<button
										className="cursor-pointer"
										type="button"
										onClick={() => onOpenModal(seg.id)}>
										<EditOutlinedIcon className="text-green-500" />
									</button>
									<button
										className="cursor-pointer"
										type="button"
										onClick={() => onDeleteOne(seg.id)}>
										<DeleteOutlineOutlinedIcon className="text-red-500" />
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
