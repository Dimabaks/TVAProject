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
