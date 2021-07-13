import { InternalServerError, NotFound } from "http-errors";
import { existsSync, mkdirSync } from "fs";
import { extname, join, resolve } from "path";
import { IRequest } from "../interfaces/i-request.interface";
import { IResponse } from "../interfaces/i-response.interface";
import { UploadedFile } from "express-fileupload";

export async function uploadImgProduct(req: IRequest, res: IResponse): Promise<IResponse> {
    let { category } = req.params;
    try {
        if (!req.files) {
            return res.json(new NotFound('Debe seleccionar una imagen.'));
        }
        let image: UploadedFile | UploadedFile[] = req.files.image as UploadedFile;
        // Obtener nombre del archivo
        let extImg = extname(image.name);
        // Sólo estas extensiones aceptamos
        const fileTypes = /jpeg|jpg|png/;
        const mimetype = fileTypes.test(image.mimetype);
        const ext = fileTypes.test(extImg);
        if (!(mimetype && ext)) {
            return res.json(new NotFound("La extension del archivo es incorrecto."))
        }
        // Nombre de archivo personalizado
        const nameFile = `${category}-${new Date().getMilliseconds()}${extImg}`;
        // Mover el archivo del temporal a un path
        const path = join(__dirname, `../public/images/${category}/${nameFile}`);
        const url = join(__dirname, `../public/images/${category}`);
        if (!existsSync(url)) {
            mkdirSync(url, { recursive: true });
        }
        await image.mv(path, (err: any) => {
            if (err) {
                return res.json(new InternalServerError('Error al mover el archivo.'));
            }
        });
        return res.json({ url: `/${category}/${nameFile}` });
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}
export async function uploadImgUser(req: IRequest, res: IResponse): Promise<IResponse> {
    try {
        if (!req.files) {
            return res.json(new NotFound('Debe seleccionar una imagen.'));
        }
        let image: UploadedFile | UploadedFile[] = req.files.image as UploadedFile;
        // Obtener nombre del archivo
        let extImg = extname(image.name);
        // Sólo estas extensiones aceptamos
        const fileTypes = /jpeg|jpg|png/;
        const mimetype = fileTypes.test(image.mimetype);
        const ext = fileTypes.test(extImg);
        if (!(mimetype && ext)) {
            return res.json(new NotFound("La extension del archivo es incorrecto."))
        }
        // Nombre de archivo personalizado
        const nameFile = `user-${new Date().getMilliseconds()}${extImg}`;
        // Mover el archivo del temporal a un path
        const path = join(__dirname, `../public/images/users/${nameFile}`);
        const url = join(__dirname, `../public/images/users/`);
        if (!existsSync(url)) {
            mkdirSync(url, { recursive: true });
        }
        await image.mv(path, (err: any) => {
            if (err) {
                return res.json(new InternalServerError('Error al mover el archivo.'));
            }
        });
        return res.json({ url: `/${nameFile}` });
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}
export async function getImage(req: IRequest, res: IResponse): Promise<IResponse | void> {
    let { category, img } = req.params;
    try {
        let path = resolve(__dirname, `../public/images/${category}/${img}`);
        if (existsSync(path)) {
            return res.sendFile(path);
        } else {
            let noImg = resolve(__dirname, '../public/images/default/no_img.png');
            return res.sendFile(noImg);
        }
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}
export async function getImageUser(req: IRequest, res: IResponse): Promise<IResponse | void> {
    let { img } = req.params;
    try {
        let path = resolve(__dirname, `../public/images/users/${img}`);
        if (existsSync(path)) {
            return res.sendFile(path);
        } else {
            let noImg = resolve(__dirname, '../public/images/default/default_user.png');
            return res.sendFile(noImg);
        }
    } catch (error) {
        return res.status(500).json(new InternalServerError(error));
    }
}