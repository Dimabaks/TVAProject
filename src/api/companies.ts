import api from "./api";

export const getCompanies = () => api.get("/companies");
export const createCompany = (data: {
	name: string;
	dotNumber: string;
	status: string;
}) => api.post("/companies", data);
export const updateCompany = (
	id: number,
	data: { name: string; dotNumber: string; status: string },
) => api.put(`/companies/${id}`, data);
export const deleteCompany = (id: number) => api.delete(`/companies/${id}`);
