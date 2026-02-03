import type { Driver } from "../../types/Drivers.types";
import { DriverRow } from "./DriverRow";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

export default function DriversList({ drivers }: { drivers: Driver[] }) {
	return (
		<div>
			<div className="grid grid-cols-12 gap-2 text-gray-600 border-b border-gray-300 pb-3">
				<span className="flex items-center">
					<PermIdentityIcon fontSize="small" className="pr-0.5" />
					Driver
				</span>
				<span>Vehicle</span>
				<span>Status</span>
				<span>Last known location</span>
				<span>Last update</span>
				<span>Eld connect</span>
				<span>Violations</span>
				<span>Last check</span>
				<span>Break</span>
				<span>Drive</span>
				<span>Shift</span>
				<span>Cycle</span>
			</div>
			<div>
				{drivers.map((driver) => (
					<DriverRow key={driver.id} driver={driver} />
				))}
			</div>
		</div>
	);
}
