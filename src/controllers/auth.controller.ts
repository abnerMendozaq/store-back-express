import { compareSync } from "bcryptjs";
import { Conflict, InternalServerError, Unauthorized } from "http-errors";
import { Branch } from "../entities/branch.model";
import { Person } from "../entities/person.model";
import { Role } from "../entities/role.model";
import { UserHasBranch } from "../entities/user-has-branch.model";
import { User } from "../entities/user.model";
import { IRequest } from "../interfaces/i-request.interface";
import { IResponse } from "../interfaces/i-response.interface";
import { encodeData } from "../lib/jwt-auth";

export async function login(req: IRequest, res: IResponse) {
    let { userName, password }: User = req.body;
    try {
        let exist = await User.findOne({
            where: { userName, state: 1 },
            include: [
                {
                    model: Person,
                    attributes: ['name']
                },
                {
                    model: Role,
                    attributes: ['roleName']
                },
                {
                    model: UserHasBranch,
                    where: { state: 1 },
                    include: [{ model: Branch }],
                    attributes: ['idBranch']
                }
            ]
        });
        if (exist == null) {
            return res.json(new Conflict('Usuario y/o contraseña incorrectos.'));
        }
        let correctPass = compareSync(password, exist.password);
        if (!correctPass) {
            return res.json(new Conflict('Usuario y/o contraseña incorrectos.'));
        }
        if (exist.role?.state == 0) {
            return res.json(new Unauthorized('Comuniquese con el administrador.'));
        }
        exist.password = '';
        return res.json({ user: exist, token: encodeData(exist) });
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}