export type Company = {
	id: string;
	name: string;
	status: CompanyStatus;
	dotNumber: string;
};

export type CompanyStatus = "active" | "inactive";
