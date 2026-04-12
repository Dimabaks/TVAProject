import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Company from "./Company";

class Driver extends Model {
	public id!: number;
	public name!: string;
	public vehicle!: string;
	public status!: string;
	public lastLocation!: string;
	public lastUpdate!: string;
	public connection!: string;
	public companyId!: number;
}

Driver.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		vehicle: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastLocation: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lastUpdate: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		connection: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "disconnected",
		},
		companyId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "drivers",
	},
);

// Связь: одна компания имеет много водителей
Company.hasMany(Driver, { foreignKey: "companyId", as: "drivers" });
Driver.belongsTo(Company, { foreignKey: "companyId", as: "company" });

export default Driver;
