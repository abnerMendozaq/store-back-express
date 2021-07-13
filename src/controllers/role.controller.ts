import { Conflict, InternalServerError } from "http-errors";
import { Role } from "../entities/role.model";
import { IRequest } from "../interfaces/i-request.interface";
import { IResponse } from "../interfaces/i-response.interface";

export async function getAllRole(req: IRequest, res: IResponse): Promise<IResponse> {
    try {
        let roles = await Role.findAll({ where: { state: 1 } });
        return res.json(roles);
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}
export async function getRole(req: IRequest, res: IResponse): Promise<IResponse> {
    let { idRole } = req.params;
    try {
        let role = await Role.findByPk(idRole);
        return res.json(role);
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}
export async function createRole(req: IRequest, res: IResponse): Promise<IResponse> {
    let role: Role = req.body;
    try {
        let exist = await Role.findOne({ where: { roleName: role.roleName.trim().toUpperCase() } });
        if (exist) {
            return res.json(new Conflict('El rol ya esta registrado'));
        }
        let roleSaved = await Role.create(role);
        return res.json(roleSaved);
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}
export async function updateRole(req: IRequest, res: IResponse): Promise<IResponse> {
    let role: Role = req.body;
    let { idRole } = role;
    try {
        await Role.update(role, { where: { idRole } });
        return res.json(role);
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}