import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Pet } from "../interfaces/pet.interface";

const __dirname = import.meta.dirname;
const pathFile = path.resolve(__dirname, "../../data/pets.json")

const readPets = async () => {
    const petsJSON = await readFile(pathFile, "utf-8");
    const pets = JSON.parse(petsJSON);
    return pets as Pet[];
}


export const PetModel = {
    readPets
}