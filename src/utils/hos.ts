import { HOS_LIMITS_MINUTES } from "../constants/hosLimits";
import type { LogStatus, LogTimeline } from "../types/Log.types";

const millisecondsToMinutes = (milliseconds: number) =>
	Math.max(0, Math.round(milliseconds / 60000));

export function formatMinutes(minutes: number): string {
	const hours = Math.floor(minutes / 60);
	const min = minutes % 60;
	return `${String(hours).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

export function percent(used: number, limit: number): number {
	if (!limit) return 0;
	return Math.min(100, Math.max(0, (used / limit) * 100));
}

export function sumMinutesByStatus(
	timeline: LogTimeline[],
	status: LogStatus,
): number {
	return timeline.reduce((acc, logSegment) => {
		if (logSegment.status !== status) return acc;
		return acc + millisecondsToMinutes(logSegment.end - logSegment.start);
	}, 0);
}

export function buildHosSummary(timeline: LogTimeline[]) {
	const breakUsed = sumMinutesByStatus(timeline, "break");
	const driveUsed = sumMinutesByStatus(timeline, "driving");
	const onDutyUsed = sumMinutesByStatus(timeline, "on duty");

	return {
		break: { used: breakUsed, limit: HOS_LIMITS_MINUTES.break },
		drive: { used: driveUsed, limit: HOS_LIMITS_MINUTES.drive },
		shift: { used: onDutyUsed + driveUsed, limit: HOS_LIMITS_MINUTES.shift },
		cycle: { used: onDutyUsed + driveUsed, limit: HOS_LIMITS_MINUTES.cycle },
	};
}
