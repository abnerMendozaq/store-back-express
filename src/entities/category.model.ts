import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";

@Table({ tableName: 'category', timestamps: false })
export class Category extends Model<Category>{
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    })
    idCategory: number;
    @Column({
        type: DataType.STRING({ length: 15 }),
        allowNull: false
    })
    categoryName: string;
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