import type { Company } from "../../types/Company.types";
import type { Driver } from "../../types/Drivers.types";
import type { buildHosSummary } from "../../utils/hos";
import LinearStatus from "../LinearStatus";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";

type HosSummary = ReturnType<typeof buildHosSummary>;

export default function DriverHeader({
	driver,
	company,
	hos,
}: {
	driver: Driver;
	company: Company;
	hos: HosSummary;
}) {
	return (
		<div className="flex h-14 w-full items-center justify-between px-5 border-b-1 border-gray-300">
			<div className="flex gap-10">
				<span className="border border-green-300 bg-green-200 rounded-2xl px-3 items-center flex gap-1">
					<PersonIcon fontSize="small" />
					{driver.name}
				</span>
				<span className="border border-green-300 bg-green-200 rounded-2xl px-3 flex items-center gap-1">
					<BusinessIcon fontSize="small" />
					{company.name}
				</span>
			</div>

			<div className="grid grid-cols-4 gap-4 px-4 pb-3">
				<LinearStatus
					used={hos.break.used}
					limit={hos.break.limit}
					barClassName="bg-orange-500"
				/>
				<LinearStatus
					used={hos.drive.used}
					limit={hos.drive.limit}
					barClassName="bg-green-500"
				/>
				<LinearStatus
					used={hos.shift.used}
					limit={hos.shift.limit}
					barClassName="bg-purple-500"
				/>
				<LinearStatus
					used={hos.cycle.used}
					limit={hos.cycle.limit}
					barClassName="bg-red-500"
				/>
			</div>
		</div>
	);
}
