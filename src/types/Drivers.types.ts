import type { LogStatus, LogTimeline } from "./Log.types";

export type Driver = {
	id: number;
	name: string;
	vehicle: string;
	status: LogStatus;
	lastLocation: string;
	lastUpdate: string;
	connection: ConnectionStatus;
	timeline: LogTimeline[];
	companyId: number;
	company?: {
		id: number;
		name: string;
		dotNumber: string;
		status: string;
	};
};

export type ConnectionStatus = "connected" | "disconnected";
