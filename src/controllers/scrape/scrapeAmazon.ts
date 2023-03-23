import axios from "axios";
import cheerio, { load } from "cheerio";
import { Request, Response } from "express";
import Product from "../../types/ProductType";
import jwt from "jsonwebtoken";
import saveToDb from "./saveToDb";
import { IncomingHttpHeaders } from "http";

const defurl =
  "https://www.amazon.in/HP-RX5500M-Graphics-Flicker-16-e0162AX/dp/B098QBT5KT?ref_=Oct_DLandingS_D_aa6c9481_60";

const product: Product = { name: "", price: 0, link: "", imageUrl: "" };

async function scrape(url = defurl) {
  // fetch the html
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  //   main container
  const item = $("div#dp-container");
  product.name = $(item).find("h1 span#productTitle").text();
  product.link = url;

  product.imageUrl = $(item).find("img#landingImage").attr("src");
  //   console.log("product name", product.name);

  const price = $(item)
    .find("span .a-price-whole")
    .first()
    .text()
    .replace(/[,.]/g, "");

  const priceNum = parseFloat(price);
  console.log("price", priceNum, typeof priceNum);
  product.price = priceNum;

  return product;
}

// setInterval(() => {
//   scrape();
// }, 10000);

const scrapeAmazonData = async (req: Request, res: Response) => {
  const data = req.body;
  // const data = req.body;

  // console.log("url is", req.body, req.headers.cookie);
  // const { authtoken } = req.headers;

  // assuming `req` is of type `Request`
  const { authtoken } = req.headers;

  console.log("auth token ", authtoken);

  const productData = await scrape(data.url);

  const savedItemId = await saveToDb(authtoken, productData, "amazon");

  res.json({ productData, provider: "amazon", savedItemId });
};

export default scrapeAmazonData;
