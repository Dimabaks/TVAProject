import { useState } from "react";
import type { ConnectionStatus } from "../../types/Drivers.types";
import { createDriver } from "../../api/drivers";

type Props = {
	open: boolean;
	onClose: () => void;
	onSuccess: () => void;
	companyId: number;
};

export default function AddDriverModal({
	open,
	onClose,
	onSuccess,
	companyId,
}: Props) {
	const [name, setName] = useState("");
	const [vehicle, setVehicle] = useState("");
	const [connection, setConnection] = useState<ConnectionStatus>("connected");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		try {
			await createDriver({
				name: name,
				vehicle: vehicle,
				status: "off duty",
				connection: connection,
				companyId: companyId,
			});
			onSuccess();
			onClose();
		} catch {
			alert("Add Driver error!");
		}
	}

	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
			<div className="bg-white rounded-lg p-6 w-96">
				<form onSubmit={handleSubmit}>
					<h1 className="text-xl font-semibold mb-4">Add Driver</h1>
					<div className="flex flex-col gap-1 mb-3">
						<label className="text-sm text-gray-600">Driver Name</label>
						<input
							className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-1 mb-3">
						<label className="text-sm text-gray-600">Vehicle Number</label>
						<input
							className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black w-full"
							type="text"
							value={vehicle}
							onChange={(e) => setVehicle(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-1 mb-3">
						<label htmlFor="">Connection Status</label>
						<select
							className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black w-full"
							value={connection}
							onChange={(e) =>
								setConnection(e.target.value as ConnectionStatus)
							}>
							<option value="connected">Connected</option>
							<option value="disconnected">Disconnected</option>
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
							Add
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
