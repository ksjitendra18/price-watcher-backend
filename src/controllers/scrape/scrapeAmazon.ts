import axios from "axios";
import cheerio, { load } from "cheerio";
import { Request, Response } from "express";
import Product from "../../types/ProductType";

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

  console.log("url is", req.body, req.headers.cookie);
  //   const price = 5500;
  console.log("lol");
  // const productData = await scrape(data.url);
  const productData = {
    name: "        Dabur Chyawanprash - 2kg, 3X Immunity, helps build Strength and Stamina       ",
    price: 595,
    link: "https://www.amazon.in/DABUR-FC49500210-Dabur-Chyawanprash-Kg/dp/B09P2Z5445/?_encoding=UTF8&pd_rd_w=hbVmm&content-id=amzn1.sym.74cadd4b-23d8-4053-8964-d57bd2df7582&pf_rd_p=74cadd4b-23d8-4053-8964-d57bd2df7582&pf_rd_r=4BGPHMW4ZS2J0TMMDA3G&pd_rd_wg=J7opb&pd_rd_r=6cdba29e-dc00-46a2-8703-fce648b0ac98&ref_=pd_gw_trq_ed_k0q65tpn",
    imageUrl:
      "https://m.media-amazon.com/images/I/41Zg0VBysML._SX300_SY300_QL70_ML2_.jpg",
  };

  res.json({ productData, provider: "amazon" });
};

export default scrapeAmazonData;
