import CompanyItem from "../../components/Companies/CompanyItem";
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
		async function fetchCompanies() {
			try {
				const res = await getCompanies();
				setCompanies(res.data);
				setLoading(false);
			} catch {
				setError("Companies loading error");
				setLoading(false);
			}
		}
		fetchCompanies();
	}, [refresh]);

	if (loading)
		return <div className="p-6 text-gray-500 text-sm">Loading...</div>;
	if (error) return <div className="p-6 text-red-500 text-sm">{error}</div>;

	return (
		<div className="p-6">
			<div className="flex justify-end mb-4">
				<button
					className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
					onClick={() => setIsModalOpen(true)}>
					+ Add Company
				</button>
			</div>

			<table className="w-full border-collapse">
				<colgroup>
					<col style={{ width: "30%" }} />
					<col style={{ width: "25%" }} />
					<col style={{ width: "10%" }} />
					<col style={{ width: "20%" }} />
					<col style={{ width: "15%" }} />
				</colgroup>
				<thead>
					<tr className="border-b border-gray-100">
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Company Name
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							DOT Number
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							ID
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Status
						</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{companies.map((company) => (
						<CompanyItem
							key={company.id}
							company={company}
							onRefresh={() => setRefresh((r) => r + 1)}
						/>
					))}
				</tbody>
			</table>

			<AddCompanyModal
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSuccess={() => setRefresh((r) => r + 1)}
			/>
		</div>
	);
}
