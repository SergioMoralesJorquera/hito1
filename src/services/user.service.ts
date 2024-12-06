import { error } from "node:console";
import { UserModel } from "../models/user.model"
import { nanoid } from "nanoid";
import { User } from "../interfaces/user.interface";
import bycrypt from "bcryptjs"

const getAllUsers = async () =>{
    const users = await UserModel.readUsers();
    return users;
}

const createUser = async (email: string, password:string) =>{
    const users = await getAllUsers();
    const user = users.find(item => item.email === email);
    if(user){
        throw new Error("Email already exists");
    }

    const salt = await bycrypt.genSalt(10);
    const passwordHash = await bycrypt.hash(password, salt);

    const newUser : User = {
        id:nanoid(),
        email,
        password: passwordHash
    }

    users.push(newUser);
    await UserModel.createUser(users);
    return newUser;

}

export const userService = {
    getAllUsers,
    createUser
}