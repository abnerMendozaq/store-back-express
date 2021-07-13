import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'store', timestamps: false })
export class Store extends Model<Store>{
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    })
    idStore: number;
    @Column({
        type: DataType.STRING({ length: 45 }),
        allowNull: false
    })
    storeName: string;
    @Column({
        type: DataType.STRING({ length: 45 }),
        allowNull: false
    })
    address: string;
    @Column({
        type: DataType.STRING({ length: 45 }),
        allowNull: false
    })
    phone: string;
    @Column({
        type: DataType.STRING({ length: 20 }),
        allowNull: false
    })
    country: string;
    @Column({
        type: DataType.STRING({ length: 20 }),
        allowNull: false
    })
    city: string;
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
    // @ForeignKey(() => StoreHasUser)
    // users: StoreHasUser[];
}