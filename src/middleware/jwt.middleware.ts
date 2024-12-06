import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (req: Request, res:Response, next: NextFunction) => {
    
    const authHeader = req.headers.authorization;

    if(!authHeader){
        res.status(401).json("NO bearer Header");
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, "secret")
        next();
    } catch (error) {
        res.status(401).json({ error: "NO bearer Header" });
    }
}