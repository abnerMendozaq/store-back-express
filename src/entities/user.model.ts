import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Person } from "./person.model";
import { Role } from "./role.model";
import { UserHasBranch } from "./user-has-branch.model";

@Table({ tableName: 'user', timestamps: false })
export class User extends Model<User> {
    @ForeignKey(() => Person)
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        primaryKey: true,
        allowNull: false,
    })
    idUser: number;
    @Column({
        type: DataType.STRING({ length: 10 }),
        allowNull: false
    })
    userName: string;
    @Column({
        type: DataType.STRING({ length: 100 }),
        allowNull: false
    })
    password: string;
    @Column({
        type: DataType.STRING({ length: 45 }),
        allowNull: true
    })
    photo: string;
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
        defaultValue: 1,
        allowNull: false
    })
    state: number;
    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        allowNull: false
    })
    idRole: number
    @BelongsTo(() => Role)
    role?: Role;
    @BelongsTo(() => Person)
    person?: Person;
    @HasMany(() => UserHasBranch)
    branchs: UserHasBranch[];
}