import api from "./api";
import { LogStatus } from "../types/Log.types";
import { ConnectionStatus } from "../types/Drivers.types";

export type CreateDriverData = {
	name: string;
	vehicle: string;
	status: LogStatus;
	lastLocation?: string;
	lastUpdate?: string;
	connection: ConnectionStatus;
	companyId: number;
};

export const getDrivers = () => api.get("/drivers");
export const createDriver = (data: CreateDriverData) =>
	api.post("/drivers", data);
export const updateDriver = (id: number, data: CreateDriverData) =>
	api.put(`/drivers/${id}`, data);
export const deleteDriver = (id: number) => api.delete(`/drivers/${id}`);
export const getDriverById = (id: number) => api.get(`/drivers/${id}`);
export const deleteTimeline = (id: number) => api.delete(`/timelines/${id}`);
export const updateTimeline = (
	id: number,
	data: { status: string; start: number },
) => api.put(`/timelines/${id}`, data);
