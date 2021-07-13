import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'session', timestamps: false })
export class Session extends Model<Session>{
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    })
    idSession: number;
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        allowNull: false
    })
    idUser: number;
    @Column({
        type: DataType.STRING({ length: 200 }),
        allowNull: false
    })
    token: string;
}