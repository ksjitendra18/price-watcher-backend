import { customAlphabet } from "nanoid";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import Product from "../../types/ProductType";

const prisma = new PrismaClient();

async function saveToDb(
  authToken: string | string[] | undefined,
  productData: Product,
  provider: string
) {
  const secret = process.env.JWT_SECRET;
  const decoded: any = jwt.verify(authToken! as string, secret!);
  const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    15
  );

  const watchedProduct = await prisma.watchlist.create({
    data: {
      itemId: nanoid(),
      itemName: productData.name,
      itemImage: productData.imageUrl!,
      itemPrice: productData.price,
      itemUrl: productData.link,
      itemProvider: provider,
      userId: decoded.userId!,
    },
    select: { itemId: true },
  });

  console.log("watched product is watched product", watchedProduct);

  return watchedProduct;
}

export default saveToDb;
