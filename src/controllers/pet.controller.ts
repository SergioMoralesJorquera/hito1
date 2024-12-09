import { NextFunction, Request, Response } from "express";
import { petService } from "../services/pet.service";
import { HttpError } from "../util/httpError.util";

const getPets = async(req: Request, res: Response, next:NextFunction) => {
    try {
        const pets = await petService.getAllPets();
        res.json(pets);
    } catch(error){
        next(error);
    }
}

const getPet = async (req: Request, res: Response, next:NextFunction) => { 
    try { 
      const { id } = req.params; 
      const pet = await petService.getPetsById(id); 
      res.json(pet); 
    } catch (error) { 
      next(error); 
    } 
  };

const createPet = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, type, age } = req.body;
      const { uid } = req;
  
      if (!uid) throw new HttpError("No token", 401);
  
      const newPet = await petService.createPet(uid, name, type, age);
      res.status(201).json({ newPet });
    } catch (error) {
      next(error);
    }
};

const updatePet = async (req: Request, res: Response, next:NextFunction) => { 
    try { 
      const { id } = req.params; 
      const { name, type, age } = req.body; 
      const pet = await petService.updatePetById(id, name, type, age); 
      res.json(pet); 
    } catch (error) { 
      next(error); 
    } 
};

  const deletePet = async (req: Request, res: Response, next:NextFunction) => { 
    try { 
      const { id } = req.params; 
      const pet = await petService.deletePetById(id); 
      res.json(pet); 
    } catch (error) { 
      next(error); 
    } 
}; 



export const petController = {getPets,getPet, createPet, updatePet, deletePet}