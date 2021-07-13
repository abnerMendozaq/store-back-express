import { Person } from "../entities/person.model";
import { User } from "../entities/user.model";
import { sequelize } from "../lib/database";
import { IRequest } from "../interfaces/i-request.interface";
import { IResponse } from "../interfaces/i-response.interface";
import { hashSync } from "bcryptjs";
import { Conflict, InternalServerError } from "http-errors";
import { UserHasBranch } from "../entities/user-has-branch.model";
import { Branch } from "../entities/branch.model";

export async function createPersonUser(req: IRequest, res: IResponse): Promise<IResponse> {
    let person: Person = req.body;
    let user: User = person.user;
    const { userName } = user;
    let transaction = await sequelize.transaction();
    try {
        let exist = await User.findOne({ where: { userName } });
        if (exist) {
            return res.json(new Conflict('El usuario ya esta registrado.'));
        }
        let personSave = await Person.create(person, { transaction });
        user.idUser = personSave.idPerson;
        user.password = hashSync(user.password, 10);
        await User.create(user, { transaction });
        await transaction.commit();
        return res.json(personSave);
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json(new InternalServerError(error));
    }
}
export async function createPersonUserBranch(req: IRequest, res: IResponse): Promise<IResponse> {
    let user: User = req.body;
    let { branchs } = user;
    let { person } = user;
    let transaction = await sequelize.transaction();
    try {
        let exist = await User.findOne({ where: { userName: user.userName } });
        if (exist) {
            return res.json(new Conflict('El usuario ya esta registrado.'));
        }
        let personSave = await Person.create(person, { transaction });
        user.idUser = personSave.idPerson;
        user.password = hashSync(user.password, 10);
        await User.create(user, { transaction });
        branchs.forEach(b => {
            b.idUser = user.idUser
        });
        await UserHasBranch.bulkCreate(branchs, { transaction });
        await transaction.commit();
        return res.json(personSave);
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json(new InternalServerError(error));
    }
}
export async function createBranchUser(req: IRequest, res: IResponse): Promise<IResponse> {
    let { idUser, userRegister, branch }: UserHasBranch = req.body;
    let transaction = await sequelize.transaction();
    try {
        let branchSaved = await Branch.create(branch, { transaction });
        let userHasBranch = new UserHasBranch();
        userHasBranch.idBranch = branchSaved.idBranch;
        userHasBranch.idUser = idUser;
        userHasBranch.userRegister = userRegister;
        await userHasBranch.save({ transaction });
        await transaction.commit();
        return res.json('ok');
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json(new InternalServerError(error));
    }
}