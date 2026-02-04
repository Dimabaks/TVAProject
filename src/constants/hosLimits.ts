export const HOS_LIMITS_MINUTES = {
	break: 8 * 60,
	drive: 11 * 60,
	shift: 14 * 60,
	cycle: 70 * 60,
} as const;

export type HosKeys = keyof typeof HOS_LIMITS_MINUTES;
