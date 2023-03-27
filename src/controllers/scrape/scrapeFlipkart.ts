import axios from "axios";
import { load } from "cheerio";
import { Request, Response } from "express";
import Product from "../../types/ProductType";
import saveToDb from "./saveToDb";

const defurl =
  "https://www.amazon.in/HP-RX5500M-Graphics-Flicker-16-e0162AX/dp/B098QBT5KT?ref_=Oct_DLandingS_D_aa6c9481_60";

const product: Product = { name: "", price: 0, link: "", imageUrl: "" };

export async function scrapeFlipkart(url = defurl) {
  const { data } = await axios.get(url);

  const $ = load(data);

  const item = $("div#container");
  product.name = $(item).find("h1 span.B_NuCI").text();
  product.link = url;

  product.imageUrl = $(item).find("img._2amPTt").attr("src");
  //   console.log("product name", product.name);

  const price = $(item)
    .find("div._30jeq3")
    .first()
    .text()
    .replace(/[^0-9]/g, "");

  const priceNum = parseFloat(price);
  // console.log("price", priceNum, typeof priceNum);
  product.price = priceNum;

  return product;
}

const scrapeFlipkartData = async (req: Request, res: Response) => {
  const data = req.body;
  const { authtoken } = req.headers;
  const productData = await scrapeFlipkart(data.url);

  const savedItemId = await saveToDb(authtoken, productData, "flipkart");

  res.json({ productData, provider: "flipkart", savedItemId });
};

export default scrapeFlipkartData;
