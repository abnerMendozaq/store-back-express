import { Conflict, InternalServerError } from "http-errors";
import { Category } from "../entities/category.model";
import { IRequest } from "../interfaces/i-request.interface";
import { IResponse } from "../interfaces/i-response.interface";

export async function getAllCategory(req: IRequest, res: IResponse): Promise<IResponse> {
    try {
        console.log('ssss');

        let categories = await Category.findAll();
        return res.json(categories);
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}
export async function createCategory(req: IRequest, res: IResponse): Promise<IResponse> {
    let category: Category = req.body;
    try {
        let exist = await Category.findOne({ where: { categoryName: category.categoryName } });
        if (exist) {
            return res.json(new Conflict('La categoria ya esta registrada.'));
        }
        let categorySaved = await Category.create(category);
        return res.json(categorySaved);
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}