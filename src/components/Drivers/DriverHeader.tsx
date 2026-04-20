import type { Driver } from "../../types/Drivers.types";
import type { buildHosSummary } from "../../utils/hos";
import { formatMinutes } from "../../utils/hos";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";

type HosSummary = ReturnType<typeof buildHosSummary>;

export default function DriverHeader({
	driver,
	hos,
}: {
	driver: Driver;
	hos: HosSummary;
}) {
	const items = [
		{
			label: "break",
			remaining: hos.break.limit - hos.break.used,
			limit: hos.break.limit,
			used: hos.break.used,
			color: "text-orange-500",
			bar: "bg-orange-500",
		},
		{
			label: "Drive",
			remaining: hos.drive.limit - hos.drive.used,
			limit: hos.drive.limit,
			used: hos.drive.used,
			color: "text-green-500",
			bar: "bg-green-500",
		},
		{
			label: "Shift",
			remaining: hos.shift.limit - hos.shift.used,
			limit: hos.shift.limit,
			used: hos.shift.used,
			color: "text-purple-500",
			bar: "bg-purple-500",
		},
		{
			label: "Cycle",
			remaining: hos.cycle.limit - hos.cycle.used,
			limit: hos.cycle.limit,
			used: hos.cycle.used,
			color: "text-red-500",
			bar: "bg-red-500",
		},
	];

	return (
		<div className="flex h-14 w-full items-center justify-between px-6 border-b border-gray-100 bg-white">
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
					<PersonIcon sx={{ fontSize: 16 }} className="text-gray-400" />
					<span className="text-sm font-medium text-gray-900">
						{driver.name}
					</span>
				</div>
				<div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
					<BusinessIcon sx={{ fontSize: 16 }} className="text-gray-400" />
					<span className="text-sm text-gray-600">{driver.company?.name}</span>
				</div>
			</div>

			<div className="flex items-center gap-6">
				{items.map((item) => (
					<div key={item.label} className="flex flex-col items-center gap-1">
						<span className="text-xs text-gray-400 uppercase tracking-wider">
							{item.label}
						</span>
						<span
							className={`text-sm font-medium ${item.remaining <= 0 ? "text-red-500" : item.color}`}>
							{item.remaining <= 0 ?
								"00:00"
							:	formatMinutes(Math.max(0, item.remaining))}
						</span>
						<div className="w-16 h-1 bg-gray-100 rounded-full">
							<div
								className={`h-1 rounded-full transition-all ${item.remaining <= 0 ? "bg-red-500" : item.bar}`}
								style={{
									width: `${Math.min(100, (item.used / item.limit) * 100)}%`,
								}}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
