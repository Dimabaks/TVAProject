export type LogStatus = "break" | "driving" | "on duty" | "off duty";

export type LogTimeline = {
	id: string;
	status: LogStatus;
	start: number;
	end: number;
};
