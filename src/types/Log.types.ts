export type LogStatus = "sleeper" | "driving" | "on duty" | "off duty";
export const LOG_STATUSES = [
	"sleeper",
	"driving",
	"on duty",
	"off duty",
] as const;

export type LogTimeline = {
	id: number;
	status: LogStatus;
	start: number;
	end: number;
};
