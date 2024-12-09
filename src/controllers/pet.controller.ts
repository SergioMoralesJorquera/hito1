import { NextFunction, Request, Response } from "express";
import { petService } from "../services/pet.service";
import { HttpError } from "../util/httpError.util";
import { petCreateSchema, petUpdateSchema } from "../schemas/pet.schema";

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
      const {error, value} = petCreateSchema.validate(req.body);
      if(error){
          throw new HttpError(error.message, 400);
      }
      const {name, type, age} = value;
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
      const {error, value} = petUpdateSchema.validate(req.body);
      if(error){
          throw new HttpError(error.message, 400);
      }
      const {name, type, age} = value;
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