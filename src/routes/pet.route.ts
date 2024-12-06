import {Router} from "express";
import {petController}  from "../controllers/pet.controller";
import { verifyToken } from "../middleware/jwt.middleware";

const router = Router();

router.get("/", verifyToken, petController.getPets);

export default router;