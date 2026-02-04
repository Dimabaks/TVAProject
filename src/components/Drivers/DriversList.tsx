import type { Driver } from "../../types/Drivers.types";
import { DriverRow } from "./DriverRow";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WifiIcon from "@mui/icons-material/Wifi";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import DoneAllIcon from "@mui/icons-material/DoneAll";

export default function DriversList({ drivers }: { drivers: Driver[] }) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full border-collapse">
				<thead>
					<tr className="border-b border-gray-300 text-gray-600">
						<th className="px-2 py-3 text-left">
							<PermIdentityIcon fontSize="small" /> Driver
						</th>
						<th className="px-2 py-3 text-left">
							<LocalShippingIcon fontSize="small" /> Vehicle
						</th>
						<th className="px-2 py-3 text-left">
							<AutorenewIcon fontSize="small" /> Status
						</th>
						<th className="px-2 py-3 text-left whitespace-nowrap">
							<LocationPinIcon fontSize="small" /> Last known location
						</th>
						<th className="px-2 py-3 text-left">
							<AccessTimeIcon fontSize="small" /> Last update
						</th>
						<th className="px-2 py-3 text-left">
							<WifiIcon fontSize="small" /> Eld connect
						</th>
						<th className="px-2 py-3 text-left">
							<PriorityHighIcon fontSize="small" /> Violations
						</th>
						<th className="px-2 py-3 text-left">
							<DoneAllIcon fontSize="small" /> Last check
						</th>
						<th className="px-2 py-3">Break</th>
						<th className="px-2 py-3">Drive</th>
						<th className="px-2 py-3">Shift</th>
						<th className="px-2 py-3">Cycle</th>
					</tr>
				</thead>

				<tbody>
					{drivers.map((driver) => (
						<DriverRow key={driver.id} driver={driver} />
					))}
				</tbody>
			</table>
		</div>
	);
}
