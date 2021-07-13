import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";

@Table({ tableName: 'discount', timestamps: false })
export class Discount extends Model<Discount>{
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    })
    idDiscount: number;
    @Column({
        type: DataType.STRING({ length: 45 }),
        allowNull: false
    })
    description: string;
    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    amount: number;
    @Column({
        type: DataType.STRING({ length: 15 }),
        allowNull: false
    })
    startDate: string;
    @Column({
        type: DataType.STRING({ length: 15 }),
        allowNull: false
    })
    endDate: string;
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
    @HasMany(() => Product)
    products: Product[];
}