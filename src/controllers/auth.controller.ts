import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";


const login = async(req: Request, res: Response, next:NextFunction) => {
    try {
        const {email, password} = req.body;
        const token = await authService.login(email, password);
        res.json(token);
    } catch(error){
        next(error);
    }
}

const register = async(req: Request, res: Response, next:NextFunction) => {
    try {
        const {email, password} = req.body;
        const newUser = await authService.register(email, password);
        res.json(newUser);
    } catch(error){
        next(error);
    }
}
export const authController = {login, register}