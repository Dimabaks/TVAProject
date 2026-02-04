import type { LogTimeline } from "../types/Log.types";

const h = (n: number) => n * 60 * 60 * 1000;
const m = (n: number) => n * 60 * 1000;

export function generateMockTimeline(now = Date.now()): LogTimeline[] {
	return [
		{ id: "t1", status: "off duty", start: now - h(10), end: now - h(8) },
		{ id: "t2", status: "on duty", start: now - h(8.7), end: now - h(7) },
		{ id: "t3", status: "driving", start: now - h(7), end: now - h(3) },
		{ id: "t4", status: "break", start: now - h(3), end: now - m(150) },
		{ id: "t5", status: "driving", start: now - m(150), end: now - h(1) },
	];
}

export function generateMockTimeline2(now = Date.now()): LogTimeline[] {
	return [
		{ id: "t1", status: "off duty", start: now - h(10), end: now - h(3) },
		{ id: "t2", status: "on duty", start: now - h(8), end: now - h(2) },
		{ id: "t3", status: "driving", start: now - h(11), end: now - h(6) },
		{ id: "t4", status: "break", start: now - h(6), end: now - m(150) },
		{ id: "t5", status: "driving", start: now - m(150), end: now - h(1) },
	];
}
