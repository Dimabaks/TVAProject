type Props = {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	message: string;
};

export default function DeleteConfirmModal({
	open,
	onClose,
	onConfirm,
	message,
}: Props) {
	if (!open) return null;
	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
			<div className="bg-white rounded-lg p-6 w-96">
				<h1>{message}</h1>
				<div className="flex justify-end gap-2 mt-4">
					<button
						className="cursor-pointer px-4 py-2 rounded-lg border border-red-500 hover:bg-gray-100"
						type="button"
						onClick={onConfirm}>
						Yes
					</button>
					<button
						className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
						type="button"
						onClick={onClose}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
