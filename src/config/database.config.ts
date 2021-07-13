import { SequelizeOptions } from "sequelize-typescript";
import { Branch } from "../entities/branch.model";
import { Category } from "../entities/category.model";
import { Discount } from "../entities/discount.model";
import { Person } from "../entities/person.model";
import { Product } from "../entities/product.model";
import { Role } from "../entities/role.model";
import { Session } from "../entities/session.model";
import { Store } from "../entities/store.model";
import { UserHasBranch } from "../entities/user-has-branch.model";
import { User } from "../entities/user.model";


export const config: SequelizeOptions = {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'administrador',
    database: 'storedb',
    dialect: 'mysql',
    models: [
        Person, User,
        Role, UserHasBranch,
        Store, Product,
        Discount, Category,
        Session, Branch
    ]
}