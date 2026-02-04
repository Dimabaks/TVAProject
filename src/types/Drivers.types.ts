import type { LogStatus, LogTimeline } from "./Log.types";

export type Driver = {
	id: string;
	name: string;
	vehicle: string;
	status: LogStatus;
	lastLocation: string;
	lastUpdate: string;
	connection: ConnectionStatus;
	timeline: LogTimeline[];
};

export type ConnectionStatus = "connected" | "disconnected";
