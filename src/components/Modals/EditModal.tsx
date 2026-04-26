import { useState } from "react";
import {
	LOG_STATUSES,
	type LogStatus,
	type LogTimeline,
} from "../../types/Log.types";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { updateTimeline } from "../../api/drivers";

type Props = {
	onClose: () => void;
	onSuccess: () => void;
	seg: LogTimeline;
};

export default function EditModal({ onClose, onSuccess, seg }: Props) {
	const [status, setStatus] = useState<LogStatus>(seg.status);
	const [date, setDate] = useState(seg.start);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		try {
			await updateTimeline(seg.id, { status, start: date });
			onSuccess();
			onClose();
		} catch {
			alert("Error updating event");
		}
	}

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
			<div className="bg-white rounded-lg p-6 w-96">
				<form onSubmit={handleSubmit}>
					<h1 className="text-xl font-semibold mb-4">Edit event</h1>
					<div className="flex flex-col gap-1 mb-3">
						<label className="text-sm text-gray-600">Date / Time</label>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateTimePicker
								value={dayjs(date)}
								onChange={(val) => setDate(val?.valueOf() ?? date)}
								ampm={false}
								timeSteps={{ minutes: 1 }}
								slotProps={{
									textField: {
										size: "small",
										fullWidth: true,
									},
								}}
							/>
						</LocalizationProvider>
					</div>
					<div className="flex flex-col gap-1 mb-3">
						<label htmlFor="">Event</label>
						<select
							className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black w-full"
							value={status}
							onChange={(e) => setStatus(e.target.value as LogStatus)}>
							{LOG_STATUSES.map((status) => (
								<option key={status} value={status}>
									{status}
								</option>
							))}
						</select>
					</div>
					<div className="flex justify-end gap-2 mt-4">
						<button
							className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
							type="button"
							onClick={onClose}>
							Cancel
						</button>
						<button
							className="cursor-pointer px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
							type="submit">
							Save status
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
