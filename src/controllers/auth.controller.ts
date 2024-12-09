import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import { authLoginSchema, authRegisterSchema } from "../schemas/auth.schema";
import { HttpError } from "../util/httpError.util";


const login = async(req: Request, res: Response, next:NextFunction) => {
    try {
        const {error, value} = authLoginSchema.validate(req.body);
        if(error){
            throw new HttpError(error.message, 400);
        }
        const {email, password} = value;
        const token = await authService.login(email, password);
        res.json({token});
    } catch(error){
        next(error);
    }
}

const register = async(req: Request, res: Response, next:NextFunction) => {
    try {
        const {error, value} = authRegisterSchema.validate(req.body);
        if(error){
            throw new HttpError(error.message, 400);
        }
        const {email, password} = value;
        const newUser = await authService.register(email, password);
        res.json(newUser);
    } catch(error){
        next(error);
    }
}
export const authController = {login, register}