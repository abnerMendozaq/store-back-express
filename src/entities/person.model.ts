import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

@Table({ tableName: 'person', timestamps: false })
export class Person extends Model<Person> {
    @Column({
        type: DataType.INTEGER({ length: 11 }),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    })
    idPerson: number;
    @Column({
        type: DataType.STRING({ length: 45 }),
        allowNull: false
    })
    name: string;
    @Column({
        type: DataType.STRING({ length: 45 }),
        allowNull: false
    })
    firstLastname: string;
    @Column({
        type: DataType.STRING({ length: 45 }),
        allowNull: true
    })
    secondLastname: string;
    @Column({
        type: DataType.STRING({ length: 15 }),
        allowNull: false
    })
    birthdate: string;
    @Column({
        type: DataType.STRING({ length: 45 }),
        allowNull: false
    })
    address: string;
    @Column({
        type: DataType.STRING({ length: 25 }),
        allowNull: false
    })
    email: string;
    @Column({
        type: DataType.STRING({ length: 45 }),
        allowNull: false
    })
    phone: string;
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false
    })
    registerDate: Date;
    @HasOne(() => User)
    user: User
}