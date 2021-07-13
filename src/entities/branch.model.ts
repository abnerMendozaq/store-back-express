import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { UserHasBranch } from "./user-has-branch.model";

@Table({ tableName: 'branch', timestamps: false })
export class Branch extends Model<Branch>{
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    })
    idBranch: number;
    @Column({
        type: DataType.STRING({ length: 45 }),
        allowNull: false
    })
    branchName: string;
    @Column({
        type: DataType.STRING({ length: 45 }),
        allowNull: false
    })
    country: string;
    @Column({
        type: DataType.STRING({ length: 45 }),
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
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        allowNull: false
    })
    idCountry: number;
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        allowNull: false
    })
    idCity: number;
    @HasMany(() => UserHasBranch)
    users: UserHasBranch[];
}