import { UserModel } from "../models/user.model"
import { nanoid } from "nanoid";
import { User } from "../interfaces/user.interface";
import bycrypt from "bcryptjs"
import { userService } from "./user.service"; 
import jwt from "jsonwebtoken";


const login = async (email: string, password:string) =>{
    const users = await userService.getAllUsers();
    const user = users.find(item => item.email === email);
    if(!user){
        throw new Error("User not found");
    }

    const isValidPassword = await bycrypt.compare(password, user.password);
    if(!isValidPassword){
        throw new Error("Password incorrect!");
    }

    const token = jwt.sign({email: user.email}, "secret", { expiresIn:"1h"});

    return token;

}

export const authService = {
    login
}