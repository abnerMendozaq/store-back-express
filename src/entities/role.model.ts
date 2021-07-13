import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

@Table({ tableName: 'role', timestamps: false })
export class Role extends Model<Role> {
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    })
    idRole: number;
    @Column({
        type: DataType.STRING({ length: 20 }),
        allowNull: false
    })
    roleName: string;
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false
    })
    registerDate: Date;
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        allowNull: false,
    })
    userRegister: number;
    @Column({
        type: DataType.TINYINT({ length: 1 }),
        allowNull: false,
        defaultValue: 1
    })
    state: number;
    @HasMany(() => User)
    user?: User[];
}