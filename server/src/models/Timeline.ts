import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Driver from "./Driver";

class Timeline extends Model {
	public id!: number;
	public status!: string;
	public start!: number;
	public end!: number;
	public driverId!: number;
}

Timeline.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		start: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		end: {
			type: DataTypes.BIGINT,
			allowNull: true,
		},
		driverId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "timelines",
	},
);

// Один водитель имеет много записей timeline
Driver.hasMany(Timeline, { foreignKey: "driverId", as: "timeline" });
Timeline.belongsTo(Driver, { foreignKey: "driverId", as: "driver" });

export default Timeline;
