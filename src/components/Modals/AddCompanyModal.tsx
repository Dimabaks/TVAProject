import { useState } from "react";
import type { CompanyStatus } from "../../types/Company.types";
import { createCompany } from "../../api/companies";

type Props = {
	open: boolean;
	onClose: () => void;
	onSuccess: () => void;
};

export default function AddCompanyModal({ open, onClose, onSuccess }: Props) {
	const [companyName, setCompanyName] = useState("");
	const [dotNumber, setDotNumber] = useState("");
	const [status, setStatus] = useState<CompanyStatus>("Active");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		try {
			await createCompany({
				name: companyName,
				dotNumber: dotNumber,
				status: status,
			});
			onSuccess();
			onClose();
		} catch {
			alert("Add Company error!");
		}
	}

	if (!open) return null;
	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
			<div className="bg-white rounded-lg p-6 w-96">
				<form onSubmit={handleSubmit}>
					<h1 className="text-xl font-semibold mb-4">Add Company</h1>
					<div className="flex flex-col gap-1 mb-3">
						<label className="text-sm text-gray-600">Company Name</label>
						<input
							className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
							type="text"
							value={companyName}
							onChange={(e) => setCompanyName(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-1 mb-3">
						<label className="text-sm text-gray-600">Dot Number</label>
						<input
							className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black w-full"
							type="text"
							value={dotNumber}
							onChange={(e) => setDotNumber(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-1 mb-3">
						<label htmlFor="">Status</label>
						<select
							className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black w-full"
							value={status}
							onChange={(e) => setStatus(e.target.value as CompanyStatus)}>
							<option value="Active">Active</option>
							<option value="Inactive">Inactive</option>
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
