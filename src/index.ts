import express from "express";
import dotenv from 'dotenv';
import authRouter from "./routes/auth.route";
import petRouter from "./routes/pet.route";
import { pool } from "./config/database";
import { httpErrorHandle } from "./middleware/httpErrorHandle.middleware";

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/pet", petRouter);

app.use(httpErrorHandle);

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


