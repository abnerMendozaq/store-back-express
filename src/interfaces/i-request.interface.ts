import { Request } from "express";
import { UserDto } from "../models/user-dto";

export interface IRequest extends Request {
    user?: UserDto;
}