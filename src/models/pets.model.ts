import { pool } from "../config/database";
import { Pet} from "../interfaces/pet.interface";

const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM PETS");
    return rows as Pet[];
};


const create = async (uid: string, name: string, type: string, age: number) => {
  const query = {
    text: `
    INSERT INTO PETS (name, age, type, user_id)
    VALUES ($1,$2,$3, $4)
    RETURNING *
    `,
    values: [name, age, type, uid],
  };

  const { rows } = await pool.query(query);
  return rows[0];
};


const findById = async (id: string) => { 
    const query = { 
      text: "SELECT * FROM pets WHERE id = $1", 
      values: [id], 
    };
    const { rows } = await pool.query(query);
    return rows[0];
}


const update = async (id: string, name:string, type:string, age:number) => { 
    const query = { 
      text: "UPDATE pets SET name = $1, type = $2 , age = $3 WHERE id = $4 RETURNING *", 
      values: [name, type, age, id], 
    }; 
   
    const { rows } = await pool.query(query); 
    return rows[0]; 
}; 

   
const remove = async (id: string) => { 
    const query = { 
      text: "DELETE FROM pets WHERE id = $1 RETURNING *", 
      values: [id], 
    }; 
   
    const { rows } = await pool.query(query); 
    return rows[0]; 
}; 


export const PetModel = {
  create,
  findAll,
  findById,
  update,
  remove
};