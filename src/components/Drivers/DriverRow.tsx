import type { Driver } from "../../types/Drivers.types";

export function DriverRow({ driver }: { driver: Driver }) {
	return (
		<button className="block w-full text-left cursor-pointer hover:bg-gray-200">
			<div className="grid grid-cols-12 border-b border-gray-300 py-3">
				<span>{driver.name}</span>
				<span>{driver.vehicle}</span>
				<span>{driver.status}</span>
				<span>{driver.lastLocation}</span>
				<span>{driver.lastUpdate}</span>
				<span>{driver.connection}</span>
				<span>-</span>
				<span>-</span>
				<span>-</span>
				<span>-</span>
				<span>-</span>
				<span>-</span>
			</div>
		</button>
	);
}
