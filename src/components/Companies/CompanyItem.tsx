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
		<div className="border border-gray-300 rounded-lg bg-white">
			<div
				onClick={() => setOpen((p) => !p)}
				className={`w-full text-left cursor-pointer hover:bg-green-200 flex items-center px-4 py-3 ${open ? "bg-green-200" : "bg-white"}`}>
				<div className="grid grid-cols-4 gap-x-5 flex-1 items-center">
					<span className="font-medium">{company.name}</span>
					<span className="text-sm text-gray-500">{company.dotNumber}</span>
					<span>{company.id}</span>
					<span>
						<span
							className={`${company.status === "Active" ? "bg-green-400" : "bg-red-300"} px-4 py-2 rounded-2xl text-sm`}>
							{company.status}
						</span>
					</span>
				</div>

				<div className="flex items-center gap-3">
					<button
						className="cursor-pointer w-1"
						onClick={(e) => {
							e.stopPropagation();
							setIsModalOpen(true);
						}}>
						<DeleteIcon />
					</button>
					<KeyboardArrowDownIcon
						className={`transition-transform ml-4 ${open ? "rotate-180" : ""}`}
					/>
				</div>
			</div>

			{open && (
				<div className="px-4 py-3  bg-white text-sm">
					<DriversList
						drivers={company.drivers}
						companyId={company.id}
						onRefresh={onRefresh}
					/>
				</div>
			)}

			<DeleteConfirmModal
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={async () => {
					await deleteCompany(company.id);
					onRefresh();
					setIsModalOpen(false);
				}}
				message={`Are you sure that you want to delete company ${company.name}`}
			/>
		</div>
	);
}
