import express from "express";
import dotenv from 'dotenv';
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import petRouter from "./routes/pet.route";

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/pet", petRouter);


app.listen(port, ()=> console.log(`Servidor corriendo en el puerto: ${port}`))

