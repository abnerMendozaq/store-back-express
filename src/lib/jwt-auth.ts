import { NextFunction } from "express";
import { JwtPayload, sign, verify, VerifyErrors } from "jsonwebtoken";
import { DateTime } from "luxon";
import { Socket } from "socket.io";
import { User } from "../entities/user.model";
import { IRequest } from "../interfaces/i-request.interface";
import { IResponse } from "../interfaces/i-response.interface";
let local = DateTime.local();
local.setZone('America/La_Paz');
export function encodeData(userPayload: User) {
    let { idUser, userName, idRole } = userPayload;
    let payload: JwtPayload = {
        idUser,
        userName,
        idRole,
        iat: local.toSeconds(),
        exp: local.plus({ hours: 24 }).toSeconds()
    };
    return sign(payload, 'prueba');
}
export function decodeData(req: IRequest, res: IResponse, next: NextFunction) {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'Usuario no autorizado.' });
    }
    let headers = req.headers.authorization.split(' ');
    if (headers[0] == 'Bearer') {
        let token = headers[1].replace(/['"]+/g, '');
        verify(token, 'prueba', (err: VerifyErrors | null, decode: JwtPayload | undefined) => {
            if (err) {
                return res.status(409).json({ message: err });
            }
            if (decode) {
                req.user = decode;
                next();
            } else {
                return res.status(403).json({ message: 'Token invalido' });
            }
        });
    } else {
        return res.status(403).json({ message: 'Token invalido' })
    }
}
export function decodeDataWS(socket: Socket, next: NextFunction) {
    if (socket.handshake.query && socket.handshake.query.token) {
        let token: string = socket.handshake.query.token.toString();
        token = token.replace(/['"]+/g, '');
        verify(token, 'prueba', async (err: any, decode: any) => {
            if (err) {
                return next(err);
            }
            if (decode) {
                return next();
            } else {
                return next({ message: 'El token ha expirado.' });
            }
        });
    }
    else {
        return next({ message: 'Usuario no autorizado' });
    }
}