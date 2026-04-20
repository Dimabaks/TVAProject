import { Router } from "express";
import Timeline from "../models/Timeline";
import { Op } from "sequelize";

const router = Router();

router.post("/", async (req, res) => {
	try {
		const { status, start, end, driverId } = req.body;
		const timeline = await Timeline.create({
			status,
			start,
			end,
			driverId,
		});
		res.status(201).json(timeline);
	} catch (err) {
		console.error("Timeline error:", err);
		res.status(500).json({ error: "Error creating timeline" });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { status, start, end } = req.body;
		await Timeline.update({ status, start, end }, { where: { id } });
		const updated = await Timeline.findByPk(id);
		res.json(updated);
	} catch {
		res.status(500).json({ error: "Error updating timeline" });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const segment = await Timeline.findByPk(id);
		if (!segment) return res.status(404).json({ error: "Not found" });
		const prevSegment = await Timeline.findOne({
			where: { driverId: segment.driverId, start: { [Op.lt]: segment.start } },
			order: [["start", "DESC"]],
		});
		if (prevSegment) {
			await prevSegment.update({ end: null });
		}
		await Timeline.destroy({ where: { id } });
		res.json({ message: "Timeline deleted" });
	} catch {
		res.status(500).json({ error: "Error deleting timeline" });
	}
});

export default router;
