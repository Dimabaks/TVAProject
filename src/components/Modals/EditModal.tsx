import type { LogTimeline } from "../../types/Log.types";

type Props = {
	onClose: () => void;
	seg: LogTimeline;
};

export default function EditModal({ onClose, seg }: Props) {
	return (
		<div className="bg-white border rounded-2xl">
			Editing: {seg.id}
			<button className="cursor-pointer" onClick={() => onClose()}>
				x
			</button>
			<p>{seg.status}</p>
			<p>{new Date(seg.start).toLocaleString()}</p>
			<p>{new Date(seg.end).toLocaleString()}</p>
		</div>
	);
}
