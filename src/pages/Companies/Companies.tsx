import CompanyItem from "../../components/Companies/CompanyItem";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import BadgeIcon from "@mui/icons-material/Badge";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useEffect, useState } from "react";
import type { Company } from "../../types/Company.types";
import { getCompanies } from "../../api/companies";
import AddCompanyModal from "../../components/Modals/AddCompanyModal";

export default function Companies() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [companies, setCompanies] = useState<Company[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [refresh, setRefresh] = useState(0);

	useEffect(() => {
		async function fecthCompanies() {
			try {
				const res = await getCompanies();
				setCompanies(res.data);
				setLoading(false);
			} catch {
				setError("Companies loading error");
				setLoading(false);
			}
		}
		fecthCompanies();
	}, [refresh]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error</div>;
	return (
		<div className="p-2 space-y-3">
			<div className="flex items-center px-4 py-2 ">
				<div className="grid grid-cols-4 flex-1 items-start mr-10 text-gray-600">
					<span className="flex items-center">
						<AccountBalanceIcon fontSize="small" className="mr-1" />
						Company Name
					</span>
					<span className="flex items-center">
						<Grid3x3Icon fontSize="small" className="mr-1" />
						DOT Number
					</span>
					<span className="flex items-center">
						<BadgeIcon fontSize="small" className="mr-1" />
						ID
					</span>
					<span className="flex items-center">
						<AutorenewIcon fontSize="small" className="mr-1" />
						Status
					</span>
					<span></span>
				</div>
				<button
					className="absolute right-7 cursor-pointer border-gray-200 border-2 px-3 py-2 rounded-2xl text-gray-600 hover:bg-gray-200 "
					onClick={() => setIsModalOpen(true)}>
					Add Company
				</button>
			</div>

			{companies.map((company) => (
				<CompanyItem
					key={company.id}
					company={company}
					onRefresh={() => setRefresh((r) => r + 1)}
				/>
			))}

			<AddCompanyModal
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSuccess={() => setRefresh((r) => r + 1)}
			/>
		</div>
	);
}
