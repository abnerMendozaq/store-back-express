import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Country } from "./country.model";

@Table({ tableName: 'city', timestamps: false })
export class City extends Model<City>{
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    })
    idCity: number;
    @Column({
        type: DataType.STRING({ length: 45 }),
        allowNull: false
    })
    cityName: string;
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false
    })
    registerDate: Date;
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        allowNull: false
    })
    userRegister: number;
    @Column({
        type: DataType.TINYINT({ length: 1 }),
        defaultValue: 1,
        allowNull: false
    })
    state: number;
    @ForeignKey(() => Country)
    country: Country;
}