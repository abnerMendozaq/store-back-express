import { Sequelize } from "sequelize-typescript";
import { config } from "../config/database.config";

export const sequelize = new Sequelize(config);
