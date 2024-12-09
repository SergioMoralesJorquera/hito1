import { PetModel } from "../models/pets.model"

const getAllPets = async () =>{
    const pets = await PetModel.findAll();
    return pets;
}

const createPet = async (uid: string, name: string, type: string, age: number) => {
  const newPet = await PetModel.create(uid, name, type, age);
  return newPet;
};

const getPetsById= async (id: string) => { 
    const pet = await PetModel.findById(id); 
    if (!pet) throw new Error("Pet not found"); 
    return pet; 
};

const updatePetById = async (uuid: string, name:string, type:string, age:number) => { 
  const pet = await PetModel.update(uuid, name, type, age); 
  if (!pet) throw new Error("Pet not found"); 
  return pet; 
}; 

const deletePetById = async (id: string) => { 
  const user = await PetModel.remove(id); 
  if (!user) throw new Error("Pet not found"); 
  return user; 
}; 

    
export const petService = {
    getAllPets,
    createPet,
    getPetsById,
    updatePetById,
    deletePetById
}