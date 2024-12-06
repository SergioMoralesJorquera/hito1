import { PetModel } from "../models/pets.model"

const getAllPets = async () =>{
    const pets = await PetModel.readPets();
    return pets;
}

export const petService = {
    getAllPets
}