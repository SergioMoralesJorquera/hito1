import { Request, Response } from "express";
import { petService } from "../services/pet.service";

const getPets = async(req: Request, res: Response) => {
    try {
        const pets = await petService.getAllPets();
        res.json(pets);
    } catch(error){
        if(error instanceof Error){
            res.status(500).json({error: error.message});
        }
        else { 
            res.status(500).json({error: "Error server"});
        }
    }
}

export const petController = {getPets}