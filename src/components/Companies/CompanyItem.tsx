import { useState } from "react";
import type { Company } from "../../types/Company.types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import DriversList from "../Drivers/DriversList";
import DeleteConfirmModal from "../Modals/DeleteConfirmModal";
import { deleteCompany } from "../../api/companies";

type Props = {
	company: Company;
	onRefresh: () => void;
};

export default function CompanyItem({ company, onRefresh }: Props) {
	const [open, setOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<tr
				onClick={() => setOpen((p) => !p)}
				className={`border-b border-gray-100 cursor-pointer transition-colors ${open ? "bg-green-50" : "hover:bg-gray-50"}`}>
				<td className="px-4 py-3 text-sm font-medium text-gray-900">
					{company.name}
				</td>
				<td className="px-4 py-3 text-sm text-gray-500">{company.dotNumber}</td>
				<td className="px-4 py-3 text-sm text-gray-500">{company.id}</td>
				<td className="px-4 py-3">
					<span
						className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                        ${
													company.status === "Active" ?
														"bg-green-50 text-green-700"
													:	"bg-red-50 text-red-700"
												}`}>
						<span
							className={`w-1.5 h-1.5 rounded-full ${company.status === "Active" ? "bg-green-500" : "bg-red-500"}`}
						/>
						{company.status}
					</span>
				</td>
				<td className="px-4 py-3">
					<div className="flex items-center gap-2 justify-end">
						<button
							className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
							onClick={(e) => {
								e.stopPropagation();
								setIsModalOpen(true);
							}}>
							<DeleteIcon sx={{ fontSize: 16 }} />
						</button>
						<KeyboardArrowDownIcon
							sx={{ fontSize: 18 }}
							className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
						/>
					</div>
				</td>
			</tr>

			{open && (
				<tr>
					<td colSpan={5} className="bg-gray-50 border-b border-gray-100 p-0">
						<DriversList
							drivers={company.drivers}
							companyId={company.id}
							onRefresh={onRefresh}
						/>
					</td>
				</tr>
			)}

			<DeleteConfirmModal
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={async () => {
					await deleteCompany(company.id);
					onRefresh();
					setIsModalOpen(false);
				}}
				message={`Are you sure that you want to delete company ${company.name}?`}
			/>
		</>
	);
}
