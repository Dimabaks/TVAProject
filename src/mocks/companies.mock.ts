import type { Company } from "../types/Company.types";

export const companiesMock: Company[] = [
	{
		id: "1",
		name: "Trans Auto SRL",
		status: "active",
		dotNumber: "2231131",
		drivers: [
			{
				id: "d1",
				name: "Andrei Tretiakov",
				vehicle: "TX-1023",
				status: "off duty",
				lastLocation: "Chicago, IL",
				lastUpdate: "10 min ago",
				connection: "connected",
			},
			{
				id: "d2",
				name: "Artur Pogonet",
				vehicle: "TX-2044",
				status: "driving",
				lastLocation: "I-90, NY",
				lastUpdate: "2 min ago",
				connection: "disconnected",
			},
		],
	},
	{
		id: "2",
		name: "Logistics Pro",
		dotNumber: "998877",
		status: "inactive",
		drivers: [],
	},
];
