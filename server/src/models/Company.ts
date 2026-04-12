import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Company extends Model {
	public id!: number;
	public name!: string;
	public dotNumber!: string;
	public status!: string;
}

Company.init(
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
		dotNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "Active",
		},
	},
	{
		sequelize,
		tableName: "companies",
	},
);

export default Company;
