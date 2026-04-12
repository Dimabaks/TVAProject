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
};

export type ConnectionStatus = "connected" | "disconnected";
