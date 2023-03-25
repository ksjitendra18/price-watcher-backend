import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import dotenv from "dotenv";

import authRouter from "./routes/auth";
import scrapeRouter from "./routes/scrape";
import watchlistRouter from "./routes/watchlist";
import predictRouter from "./routes/predict";
// cron scheduler
import cron from "node-cron";
import { PrismaClient } from "@prisma/client";

import intiliaseScrape from "./controllers/cron/performScrape";
const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    exposedHeaders: ["x-auth-token", "auth-token"],
  })
);
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/scrape", scrapeRouter);
app.use("/watchlist", watchlistRouter);
app.use("/predict", predictRouter);
app.use("/auth", authRouter);

app.listen(8000, () => {
  console.log("App running🚀");
});

const prisma = new PrismaClient();

cron.schedule(" * * * * *", async () => {
  const itemDetails = await prisma.watchlist.findMany({
    select: {
      itemId: true,
      itemProvider: true,
      itemPrice: true,
      itemUrl: true,
    },
  });

  intiliaseScrape(itemDetails);
  console.log("cron job running");
});
