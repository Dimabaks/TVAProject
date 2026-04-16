import { useParams } from "react-router-dom";
import DriverHeader from "../../components/Drivers/DriverHeader";
import { buildHosSummary } from "../../utils/hos";
import DriverGraphic from "../../components/DriverGraphic";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TimelineEditor from "../../components/Drivers/TimelineEditor";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { type LogTimeline } from "../../types/Log.types";
import EditModal from "../../components/Modals/EditModal";
import { Driver } from "../../types/Drivers.types";
import { getDriverById } from "../../api/drivers";

export function DriverDetails() {
	const { driverId } = useParams<{ driverId: string }>();

	const [selectedDate, setSelectedDate] = useState(() => new Date());
	const [driver, setDriver] = useState<Driver | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [timeline, setTimeline] = useState<LogTimeline[]>([]);

	useEffect(() => {
		async function fetchDriver() {
			try {
				const res = await getDriverById(Number(driverId));
				setDriver(res.data);
				setTimeline(res.data.timeline ?? []);
				setLoading(false);
			} catch {
				setError("Driver not found");
				setLoading(false);
			}
		}
		fetchDriver();
	}, [driverId]);

	const currentDate = selectedDate.toLocaleDateString();

	const [selectedIds, setSelectedIds] = useState<string[]>([]);

	const [editId, setEditId] = useState<string | null>(null);

	const editingSeg = timeline.find((seg) => seg.id === editId);

	const hos = buildHosSummary(timeline);

	function toggleSelected(id: string) {
		if (selectedIds.includes(id)) {
			setSelectedIds(selectedIds.filter((item) => item !== id));
		} else {
			setSelectedIds([...selectedIds, id]);
		}
	}

	function deleteSelected() {
		setTimeline((prev) => prev.filter((seg) => !selectedIds.includes(seg.id)));
		clearSelected();
	}

	function deleteOne(id: string) {
		setTimeline((prev) => prev.filter((seg) => seg.id !== id));
		setSelectedIds((prev) => prev.filter((seg) => seg !== id));
	}

	function clearSelected() {
		setSelectedIds([]);
	}

	function toggleSelectAll() {
		setSelectedIds((prev) => {
			const allIds = timeline.map((seg) => seg.id);
			const isAllSelected = prev.length === allIds.length && allIds.length > 0;

			return isAllSelected ? [] : allIds;
		});
	}

	function openEdit(id: string) {
		setEditId(id);
	}

	function closeEdit() {
		setEditId(null);
	}

	const sorted = [...timeline].sort((a, b) => a.start - b.start);
	console.log(sorted);

	sorted.forEach((seg, i) => {
		const next = sorted[i + 1];
		if (!next) return;

		const gap = next.start - seg.end;

		if (gap > 0) {
			console.log("GAP между", seg.id, "и", next.id, "на", gap / 60000, "мин");
		}

		if (gap < 0) {
			console.log(
				"OVERLAP (пересечение) между",
				seg.id,
				"и",
				next.id,
				"на",
				Math.abs(gap) / 60000,
				"мин",
			);
		}
	});

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error</div>;
	if (!driver) return <div>Driver not found</div>;

	return (
		<div className="flex flex-col">
			<DriverHeader driver={driver} hos={hos} />

			<div className="inline-flex w-fit gap-3 border border-green-300 p-2 rounded-2xl ml-10 items-center text-lime-900 mt-7">
				<button
					type="button"
					className="px-3 py-1 cursor-pointer"
					onClick={() =>
						setSelectedDate((d) => new Date(d.getTime() - 24 * 60 * 60 * 1000))
					}>
					<ArrowBackIosIcon />
				</button>

				<span className="flex gap-2 items-center ">
					<CalendarMonthIcon fontSize="small" />
					{currentDate}
				</span>

				<button
					type="button"
					className="px-3 py-1 cursor-pointer"
					onClick={() =>
						setSelectedDate((d) => new Date(d.getTime() + 24 * 60 * 60 * 1000))
					}>
					<ArrowForwardIosIcon />
				</button>
			</div>

			<div className="pt-10 pb-10 flex justify-center bg-gray-50 mt-5">
				<DriverGraphic timeline={timeline} date={selectedDate} />
			</div>

			<div className="mt-3">
				<TimelineEditor
					driver={driver}
					timeline={timeline}
					onToggleSelected={toggleSelected}
					onToggleSelectedAll={toggleSelectAll}
					selectedIds={selectedIds}
					onDeleteOne={deleteOne}
					onOpenModal={openEdit}
				/>
			</div>

			<div>
				<button
					className="cursor-pointer"
					onClick={() => deleteSelected()}
					disabled={selectedIds.length === 0}>
					<DeleteOutlineOutlinedIcon className="text-red-500" />
				</button>
			</div>

			{editingSeg && <EditModal seg={editingSeg} onClose={closeEdit} />}
		</div>
	);
}
