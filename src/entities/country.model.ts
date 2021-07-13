import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { City } from "./city.model";

@Table({ tableName: 'country', timestamps: false })
export class Country extends Model<Country>{
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    })
    idCountry: number;
    @Column({
        type: DataType.STRING({ length: 45 }),
        allowNull: false
    })
    countryName: string;
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
    state: number
    @HasMany(() => City)
    cities: City[];
}