import type { Driver } from "./Drivers.types";

export type Company = {
	id: number;
	name: string;
	status: CompanyStatus;
	dotNumber: string;
	drivers: Driver[];
};

export type CompanyStatus = "Active" | "Inactive";
