import { Router } from "express";
import getWatchlist from "../controllers/watchlist/get";
import getAllWatchlist from "../controllers/watchlist/getAll";
const router = Router();

router.get("/all", getAllWatchlist);
router.get("/:id", getWatchlist);

export default router;
