import { InternalServerError } from "http-errors";
import { Store } from "../entities/store.model";
import { IRequest } from "../interfaces/i-request.interface";
import { IResponse } from "../interfaces/i-response.interface";
/**Stores */
export async function getAllStore(req: IRequest, res: IResponse): Promise<IResponse> {
    try {
        let stores = await Store.findAll();
        return res.json(stores);
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}
export async function getStore(req: IRequest, res: IResponse): Promise<IResponse> {
    try {
        return res.json();
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}
export async function createStore(req: IRequest, res: IResponse): Promise<IResponse> {
    let store: Store = req.body;
    try {
        let storeSaved = await Store.create(store);
        return res.json(storeSaved);
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}
// /**branchs by user */
export async function getStoresByUser(req: IRequest, res: IResponse): Promise<IResponse> {
    //     let { idUser } = req.params;
    //     try {
    //         let storesUser = await UserHasBranch.findAll({ where: { idUser, state: 1 }, include: [{ model: Branch }] });
    //         let stores: Store[] = [];
    //         storesUser.forEach(({ store }) => {
    //             stores.push(store);
    //         });
    return res.json();
    //     } catch (error) {
    //         return res.json(new InternalServerError(error));
    //     }
}