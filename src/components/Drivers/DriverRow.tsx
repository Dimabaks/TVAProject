import { useNavigate } from "react-router-dom";
import type { Driver } from "../../types/Drivers.types";
import WifiIcon from "@mui/icons-material/Wifi";
import { buildHosSummary } from "../../utils/hos";
import LinearStatus from "../LinearStatus";

export function DriverRow({ driver }: { driver: Driver }) {
	const navigate = useNavigate();

	const hos = buildHosSummary(driver.timeline);
	return (
		<tr
			className="border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
			onClick={() => navigate(`/drivers/${driver.id}`)}>
			<td className="px-2 py-3 font-medium">{driver.name}</td>
			<td className="px-2 py-3">{driver.vehicle}</td>
			<td className="px-2 py-3">{driver.status}</td>
			<td className="px-2 py-3 truncate max-w-xs">{driver.lastLocation}</td>
			<td className="px-2 py-3 whitespace-nowrap">{driver.lastUpdate}</td>
			<td className="p-3">
				<span
					className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-2xl
      ${
				driver.connection === "connected" ?
					"bg-green-300 text-green-800"
				:	"bg-red-300 text-red-800"
			}`}>
					<WifiIcon
						sx={{
							color:
								driver.connection === "connected" ?
									"success.main"
								:	"error.main",
						}}
					/>
					<span className="whitespace-nowrap">{driver.connection}</span>
				</span>
			</td>
			<td className="px-2 py-3"></td>
			<td className="px-2 py-3"></td>
			<td className="px-2 py-3">
				<LinearStatus
					used={hos.break.used}
					limit={hos.break.limit}
					barClassName="bg-orange-500"
				/>
			</td>
			<td className="px-2 py-3">
				<LinearStatus
					used={hos.drive.used}
					limit={hos.drive.limit}
					barClassName="bg-green-500"
				/>
			</td>
			<td className="px-2 py-3">
				<LinearStatus
					used={hos.shift.used}
					limit={hos.shift.limit}
					barClassName="bg-purple-500"
				/>
			</td>
			<td className="px-2 py-3">
				<LinearStatus
					used={hos.cycle.used}
					limit={hos.cycle.limit}
					barClassName="bg-red-500"
				/>
			</td>
		</tr>
	);
}
