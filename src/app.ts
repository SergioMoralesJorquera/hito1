import express from "express";
import dotenv from 'dotenv';
import rateLimit from "express-rate-limit";
import authRouter from "./routes/auth.route";
import petRouter from "./routes/pet.route";
import { httpErrorHandle } from "./middleware/httpErrorHandle.middleware";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Configurar el limitador
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 peticiones por IP
    message:
      "Demasiadas solicitudes desde esta IP, por favor inténtalo más tarde.",
    standardHeaders: true, // Informa el límite en las cabeceras `RateLimit-*`
    legacyHeaders: false, // Desactiva las cabeceras `X-RateLimit-*`
});
  
  // Aplicar el limitador globalmente
app.use(limiter);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/pet", petRouter);

app.use(httpErrorHandle);

export default app;
