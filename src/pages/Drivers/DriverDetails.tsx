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
import { deleteTimeline, getDriverById } from "../../api/drivers";

export function DriverDetails() {
	const { driverId } = useParams<{ driverId: string }>();

	const [selectedDate, setSelectedDate] = useState(() => new Date());
	const [driver, setDriver] = useState<Driver | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [timeline, setTimeline] = useState<LogTimeline[]>([]);
	const [refresh, setRefresh] = useState(0);

	useEffect(() => {
		async function fetchDriver() {
			try {
				const res = await getDriverById(Number(driverId));
				const data = res.data;
				data.timeline = data.timeline?.map((seg: LogTimeline) => ({
					...seg,
					start: Number(seg.start),
					end: seg.end === null ? Date.now() : Number(seg.end),
				}));
				setDriver(data);
				setTimeline(data.timeline ?? []);
				console.log("timeline:", data.timeline);
				setLoading(false);
			} catch {
				setError("Driver not found");
				setLoading(false);
			}
		}
		fetchDriver();
	}, [driverId, refresh]);

	const currentDate = selectedDate.toLocaleDateString();

	const [selectedIds, setSelectedIds] = useState<number[]>([]);

	const [editId, setEditId] = useState<number | null>(null);

	const editingSeg = timeline.find((seg) => seg.id === editId);

	const hos = buildHosSummary(timeline);

	function toggleSelected(id: number) {
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

	async function deleteOne(id: number) {
		await deleteTimeline(id);
		setTimeline((prev) => prev.filter((seg) => seg.id !== id));
		setSelectedIds((prev) => prev.filter((seg) => seg !== id));
		setRefresh((r) => r + 1);
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

	function openEdit(id: number) {
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

			<div className="flex items-center gap-1 ml-6 mt-5 w-fit border border-gray-100 rounded-lg bg-white overflow-hidden">
				<button
					type="button"
					className="px-3 py-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
					onClick={() =>
						setSelectedDate((d) => new Date(d.getTime() - 24 * 60 * 60 * 1000))
					}>
					<ArrowBackIosIcon sx={{ fontSize: 12 }} />
				</button>

				<div className="flex items-center gap-2 px-3 py-2 border-x border-gray-100">
					<CalendarMonthIcon sx={{ fontSize: 14 }} className="text-gray-400" />
					<span className="text-sm font-medium text-gray-700">
						{currentDate}
					</span>
				</div>

				<button
					type="button"
					className="px-3 py-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
					onClick={() =>
						setSelectedDate((d) => new Date(d.getTime() + 24 * 60 * 60 * 1000))
					}>
					<ArrowForwardIosIcon sx={{ fontSize: 12 }} />
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
					date={selectedDate}
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

			{editingSeg && (
				<EditModal
					seg={editingSeg}
					onSuccess={() => {
						setRefresh((r) => r + 1);
						closeEdit();
					}}
					onClose={closeEdit}
				/>
			)}
		</div>
	);
}
