import { Router } from "express";
import { prediction } from "../controllers/predict/predictLaptop";
const router = Router();

router.post("/", prediction);

export default router;
