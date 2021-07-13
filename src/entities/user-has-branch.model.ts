import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Branch } from "./branch.model";
import { User } from "./user.model";

@Table({ tableName: 'user_has_branch', timestamps: false })
export class UserHasBranch extends Model<UserHasBranch>{
    @ForeignKey(() => Branch)
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        primaryKey: true,
        allowNull: false
    })
    idBranch: number;
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        primaryKey: true,
        allowNull: false
    })
    idUser: number;
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
    @BelongsTo(() => Branch)
    branch: Branch;
    @BelongsTo(() => User)
    user: User;
}