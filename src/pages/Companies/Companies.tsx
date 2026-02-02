import { KeyboardArrowDown } from "@mui/icons-material";
import CompanyItem from "../../components/Companies/CompanyItem";
import { companiesMock } from "../../mocks/companies.mock";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import BadgeIcon from "@mui/icons-material/Badge";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export default function Companies() {
	return (
		<div className="p-5 space-y-3">
			<div className="flex items-center px-4 py-2 ">
				<div className="grid grid-cols-4 flex-1 items-center text-gray-600">
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
				</div>

				<KeyboardArrowDown />
			</div>

			{companiesMock.map((company) => (
				<CompanyItem key={company.id} company={company} />
			))}
		</div>
	);
}
