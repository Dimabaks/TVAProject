import { Router } from "express";
import Driver from "../models/Driver";
import Timeline from "../models/Timeline";
import Company from "../models/Company";

const router = Router();

// GET /api/drivers - получить всех водителей с timeline
router.get("/", async (req, res) => {
	try {
		const drivers = await Driver.findAll({
			include: [{ model: Timeline, as: "timeline" }],
		});
		res.json(drivers);
	} catch {
		res.status(500).json({ error: "Ошибка получения водителей" });
	}
});

// GET - получить водителя по id
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const driver = await Driver.findByPk(id, {
			include: [
				{ model: Timeline, as: "timeline" },
				{ model: Company, as: "company" },
			],
		});
		if (!driver) {
			return res.status(404).json({ error: "Driver not found" });
		}
		res.json(driver);
	} catch {
		res.status(500).json({ error: "Error driver loading" });
	}
});

// POST /api/drivers - создать водителя
router.post("/", async (req, res) => {
	try {
		const {
			name,
			vehicle,
			status,
			lastLocation,
			lastUpdate,
			connection,
			companyId,
		} = req.body;
		const driver = await Driver.create({
			name,
			vehicle,
			status,
			lastLocation,
			lastUpdate,
			connection,
			companyId,
		});
		res.status(201).json(driver);
	} catch {
		res.status(500).json({ error: "Error driver loading" });
	}
});

// PUT /api/drivers/:id - обновить водителя
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const {
			name,
			vehicle,
			status,
			lastLocation,
			lastUpdate,
			connection,
			companyId,
		} = req.body;
		await Driver.update(
			{
				name,
				vehicle,
				status,
				lastLocation,
				lastUpdate,
				connection,
				companyId,
			},
			{ where: { id } },
		);
		const updated = await Driver.findByPk(id, {
			include: [{ model: Timeline, as: "timeline" }],
		});
		res.json(updated);
	} catch {
		res.status(500).json({ error: "Error driver update" });
	}
});

// DELETE /api/drivers/:id - удалить водителя
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await Driver.destroy({ where: { id } });
		res.json({ message: "Driver was deleted" });
	} catch {
		res.status(500).json({ error: "Error driver delete" });
	}
});

export default router;
