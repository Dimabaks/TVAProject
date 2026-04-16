import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {
	try {
		const { email, password, secretKey } = req.body;

		if (secretKey !== process.env.REGISTER_SECRET) {
			return res.status(403).json({ error: "Forbidden" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			email,
			password: hashedPassword,
		});
		res.status(201).json({ message: "User created", id: user.id });
	} catch {
		res.status(500).json({ error: "Error creating user" });
	}
});

router.post("/login", async (req, res) => {
	console.log("Login attempt", req.body);
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			return res.status(401).json({ error: "Ivalid credentials" });
		}

		const token = jwt.sign(
			{ id: user.id, role: user.role },
			process.env.JWT_SECRET!,
			{ expiresIn: "7d" },
		);

		res.json({ token, role: user.role });
	} catch {
		res.status(500).json({ error: "Error logging in" });
	}
});

export default router;
