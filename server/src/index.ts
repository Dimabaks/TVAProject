import express from "express";
import cors from "cors";
import sequelize from "./config/database";
import "./models/Timeline";
import companiesRouter from "./routes/companies";
import driversRouter from "./routes/drivers";
import "./models/User";
import authRouter from "./routes/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/companies", companiesRouter);
app.use("/api/drivers", driversRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
	res.send("API is working");
});

sequelize
	.sync({ alter: true })
	.then(() => {
		console.log("✅ Database synced");
		app.listen(3001, () => {
			console.log("🚀 Server running on port 3001");
		});
	})
	.catch((err: unknown) => {
		console.error("❌ Database sync error:", err);
	});
