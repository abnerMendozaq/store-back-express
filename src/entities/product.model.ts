import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Category } from "./category.model";
import { Discount } from "./discount.model";

@Table({ tableName: 'product', timestamps: false })
export class Product extends Model<Product>{
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    })
    idProduct: number;
    @Column({
        type: DataType.STRING({ length: 45 }),
        allowNull: false
    })
    productName: string;
    @Column({
        type: DataType.STRING({ length: 20 }),
        allowNull: false
    })
    serie: string;
    @Column({
        type: DataType.STRING({ length: 15 }),
        allowNull: false
    })
    barcode: string;
    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    purchasePrice: number;
    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    salePrice: number;
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
    @ForeignKey(() => Discount)
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        allowNull: true
    })
    idDiscount: number;
    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        allowNull: true
    })
    idCategory: number
    @BelongsTo(() => Category)
    category?: Category;
    @BelongsTo(() => Discount)
    discount?: Discount
}