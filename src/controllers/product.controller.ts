import { BadRequest, Conflict, InternalServerError } from "http-errors";
import { Op } from "sequelize";
import { Product } from "../entities/product.model";
import { IRequest } from "../interfaces/i-request.interface";
import { IResponse } from "../interfaces/i-response.interface";

export async function createProduct(req: IRequest, res: IResponse): Promise<IResponse> {
    let product: Product = req.body;
    try {
        let exist = await Product.findOne({ where: { productName: product.productName } });
        if (exist) {
            return res.json(new Conflict('El producto ya esta registrado.'));
        }
        let productSaved = await Product.create(product);
        return res.json(productSaved);
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}
export async function getAllProduct(req: IRequest, res: IResponse): Promise<IResponse> {
    let { idCategory, idColor, idBranch } = req.query;
    let { limit, offset, query } = req.body;
    try {
        offset = (offset - 1) * limit;
        if (offset < 0) {
            return res.json(new BadRequest('La pagina tiene que se mayor a 0.'));
        }
        let products: Product[] = [];
        let total: number = 0;
        if (idCategory != undefined) {
            total = await Product.count({ where: { productName: { [Op.like]: `%${query}%` }, idCategory } });
            products = await Product.findAll({ limit, offset, where: { productName: { [Op.like]: `%${query}%` }, idCategory } });
        } else if (idColor != undefined) {

        } else if (idBranch != undefined) {

        } else {
            total = await Product.count({ where: { productName: { [Op.like]: `%${query}%` } } });
            products = await Product.findAll({ limit, offset, where: { productName: { [Op.like]: `%${query}%` } } });
        }
        let pages = Math.ceil(total / limit);
        return res.json({ products, pages, total });
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}