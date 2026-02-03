export type Driver = {
	id: string;
	name: string;
	vehicle: string;
	status: DriverStatus;
	lastLocation: string;
	lastUpdate: string;
	connection: ConnectionStatus;
};

export type DriverStatus = "off duty" | "on duty" | "driving";
export type ConnectionStatus = "connected" | "disconnected";
