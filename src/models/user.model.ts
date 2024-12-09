import { pool } from "../config/database";
import { User as IUser } from "../interfaces/user.interface";

const findOneByEmail = async (email: string) => {
    // Datos parametrizados
    const query = {
      text: `
      SELECT * FROM USERS
      WHERE email = $1
      `,
      values: [email],
    };
  
    const { rows } = await pool.query(query);
  
    return rows[0] as IUser; 
  };

  const createRegister = async (email: string, password: string) => {
    const query = {
      text: `
      INSERT INTO USERS (email, password)
      VALUES ($1, $2)
      RETURNING *
      `,
      values: [email, password],
    };
  
    const { rows } = await pool.query(query);
  
    return rows[0] as IUser;
  };

  export const UserModel = {
    createRegister,
    findOneByEmail,
  };