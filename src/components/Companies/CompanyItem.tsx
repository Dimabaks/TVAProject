import { useState } from "react";
import type { Company } from "../../types/Company.types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DriversList from "../Drivers/DriversList";

type Props = {
	company: Company;
};

export default function CompanyItem({ company }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<div className="border border-gray-300 rounded-lg bg-white">
			<button
				type="button"
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

				<KeyboardArrowDownIcon
					className={`transition-transform ml-4 ${open ? "rotate-180" : ""}`}
				/>
			</button>

			{open && (
				<div className="px-4 py-3  bg-white text-sm">
					<DriversList drivers={company.drivers} />
				</div>
			)}
		</div>
	);
}
