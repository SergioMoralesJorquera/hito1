import {Router} from "express";
import {petController}  from "../controllers/pet.controller";
import { verifyToken } from "../middleware/jwt.middleware";

const router = Router();

router.get("/", verifyToken, petController.getPets);
router.get("/:id", verifyToken, petController.getPet);
router.post("/", verifyToken, petController.createPet);
router.put("/:id", verifyToken, petController.updatePet);
router.delete("/:id", verifyToken, petController.deletePet);

export default router;