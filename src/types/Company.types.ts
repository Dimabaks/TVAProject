import type { Driver } from "./Drivers.types";

export type Company = {
	id: string;
	name: string;
	status: CompanyStatus;
	dotNumber: string;
	drivers: Driver[];
};

export type CompanyStatus = "active" | "inactive";
