import { Router } from "express";
import { getAllPrices } from "../controllers/prices/getAllPrices";
const router = Router();

router.get("/", getAllPrices);

export default router;
