import { Router } from "express";
import scrapeAmazonData from "../controllers/scrape/scrapeAmazon";
import scrapeFlipkartData from "../controllers/scrape/scrapeFlipkart";
const router = Router();

router.post("/amazon", scrapeAmazonData);
router.post("/flipkart", scrapeFlipkartData);

export default router;
