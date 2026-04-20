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
	timeline: LogTimeline[] = [],
	status: LogStatus,
): number {
	return timeline.reduce((acc, logSegment) => {
		if (logSegment.status !== status) return acc;
		return acc + millisecondsToMinutes(logSegment.end - logSegment.start);
	}, 0);
}

export function buildHosSummary(timeline: LogTimeline[] = []) {
	const driveUsed = sumMinutesByStatus(timeline, "driving");
	const onDutyUsed = sumMinutesByStatus(timeline, "on duty");
	const offDutyUsed = sumMinutesByStatus(timeline, "off duty");
	const breakUsed = sumMinutesByStatus(timeline, "break");

	// Shift = всё время с начала первого события
	const shiftUsed = driveUsed + onDutyUsed + offDutyUsed + breakUsed;

	// break — считаем сколько driving прошло с последнего перерыва/off duty
	const sortedTimeline = [...timeline].sort((a, b) => a.start - b.start);
	let drivingSinceLastbreak = 0;
	for (const seg of sortedTimeline) {
		if (seg.status === "break" || seg.status === "off duty") {
			drivingSinceLastbreak = 0;
		} else if (seg.status === "driving") {
			drivingSinceLastbreak += millisecondsToMinutes(seg.end - seg.start);
		}
	}

	return {
		break: {
			used: drivingSinceLastbreak,
			limit: HOS_LIMITS_MINUTES.break,
		},
		drive: { used: driveUsed, limit: HOS_LIMITS_MINUTES.drive },
		shift: { used: shiftUsed, limit: HOS_LIMITS_MINUTES.shift },
		cycle: { used: driveUsed + onDutyUsed, limit: HOS_LIMITS_MINUTES.cycle },
	};
}
