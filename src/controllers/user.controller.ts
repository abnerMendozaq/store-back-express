import { User } from '../entities/user.model';
import { hashSync } from "bcryptjs";
import { IRequest } from '../interfaces/i-request.interface';
import { IResponse } from '../interfaces/i-response.interface';
import { Person } from '../entities/person.model';
import { Role } from '../entities/role.model';
import { Conflict, InternalServerError } from 'http-errors';

export async function getAllUser(req: IRequest, res: IResponse): Promise<IResponse> {
    try {
        let users: User[] = await User.findAll({
            include: [{ model: Person }, { model: Role }],
            attributes: ["idUser", "user", "photo", "registerDate", "userRegister", "state", "idRole"]
        });
        return res.json(users);
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}
export async function createUser(req: IRequest, res: IResponse): Promise<IResponse> {
    let { userName, password }: User = req.body;
    try {
        let exist = await User.findOne({ where: { userName } });
        if (exist != null) {
            return res.json(new Conflict('El usuario ya esta registrado.'));
        } else {
            let userSave = new User();
            userSave.userName = userName;
            userSave.password = hashSync(password, 10);
            let userSaved = await userSave.save();
            return res.json(userSaved);
        }
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}