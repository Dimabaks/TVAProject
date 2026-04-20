import { Router } from "express";
import Company from "../models/Company";
import Driver from "../models/Driver";
import Timeline from "../models/Timeline";

const router = Router();

// GET /api/companies - получить все компании с водителями
router.get("/", async (req, res) => {
	try {
		const companies = await Company.findAll({
			include: [
				{
					model: Driver,
					as: "drivers",
					include: [{ model: Timeline, as: "timeline" }],
				},
			],
		});
		res.json(companies);
	} catch {
		res.status(500).json({ error: "Ошибка получения компаний" });
	}
});

// POST /api/companies - создать новую компанию
router.post("/", async (req, res) => {
	try {
		const { name, dotNumber, status } = req.body;
		const company = await Company.create({ name, dotNumber, status });
		res.status(201).json(company);
	} catch {
		res.status(500).json({ err: "Ошибка создания компании" });
	}
});

// DELETE /api/companies/:id - удалить компанию по id
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await Company.destroy({ where: { id } });
		res.json({ message: "Компания удалена" });
	} catch {
		res.status(500).json({ error: "Ошибка удаления компании" });
	}
});

// PUT /api/companies/:id - обновить компанию
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { name, dotNumber, status } = req.body;
		await Company.update({ name, dotNumber, status }, { where: { id } });
		const updated = await Company.findByPk(id);
		res.json(updated);
	} catch {
		res.status(500).json({ error: "Ошибка обновления компании" });
	}
});

export default router;
