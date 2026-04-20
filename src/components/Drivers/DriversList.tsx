import type { Driver } from "../../types/Drivers.types";
import { DriverRow } from "./DriverRow";
import { useState } from "react";
import AddDriverModal from "../Modals/AddDriverModal";

export default function DriversList({
	drivers,
	companyId,
	onRefresh,
}: {
	drivers: Driver[];
	companyId: number;
	onRefresh: () => void;
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div className="overflow-x-auto">
			<table className="w-full border-collapse">
				<thead>
					<tr className="border-b border-gray-100">
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Driver
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Vehicle
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Status
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Location
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Last update
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							ELD
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Violations
						</th>
						<th className="text-left px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Last check
						</th>
						<th className="text-center px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							break
						</th>
						<th className="text-center px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Drive
						</th>
						<th className="text-center px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Shift
						</th>
						<th className="text-center px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
							Cycle
						</th>
						<th className="px-4 py-2 text-right">
							<button
								className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors cursor-pointer ml-auto"
								onClick={() => setIsModalOpen(true)}>
								+ Add Driver
							</button>
						</th>
					</tr>
				</thead>
				<tbody>
					{drivers.map((driver) => (
						<DriverRow key={driver.id} driver={driver} onRefresh={onRefresh} />
					))}
				</tbody>
			</table>
			<AddDriverModal
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSuccess={() => {
					onRefresh();
					setIsModalOpen(false);
				}}
				companyId={companyId}
			/>
		</div>
	);
}
