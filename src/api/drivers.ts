import api from "./api";

export type CreateDriverData = {
	name: string;
	vehicle: string;
	status: string;
	lastLocation: string;
	lastUpdate: string;
	connection: string;
	companyId: number;
};

export const getDrivers = () => api.get("/drivers");
export const createDriver = (data: CreateDriverData) =>
	api.post("/drivers", data);
export const updateDriver = (id: number, data: CreateDriverData) =>
	api.put(`/drivers/${id}`, data);
export const deleteDriver = (id: number) => api.delete(`/drivers/${id}`);
