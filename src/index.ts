import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import scrapeRouter from "./routes/scrape";
import authRouter from "./routes/auth";
import dotenv from "dotenv";

// cron scheduler
import cron from "node-cron";
const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    exposedHeaders: ["x-auth-token", "auth-token"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();
app.use("/scrape", scrapeRouter);
app.use("/auth", authRouter);

app.listen(8000, () => {
  console.log("App running🚀");
});

// cron.schedule("* * * * *", () => {
//   console.log("cron job running");
// });
