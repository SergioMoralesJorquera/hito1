import dotenv from 'dotenv';
import app from "./app"
import { pool } from "./config/database";

dotenv.config();

const port = process.env.PORT || 3001;

const main = async()=>{
    try {
        const { rows } = await pool.query('SELECT NOW() as now');  
        console.log(rows[0].now, "DB connect");
        app.listen(port, ()=> console.log(`Server running in port: ${port}`));
    } catch (error) {
        console.error(error);
    }
}

main();


