import { Request, Response } from "express";
import prisma from "../../utils/prisma";
export const getAllPrices = async (req: Request, res: Response) => {
  const itemId = req.query.itemId;

  const prices = await prisma.prices.findMany({
    where: { watchlistId: itemId as string },
    select: { price: true, watchlistId: true, updated_at: true },
  });
  res.status(200).json({
    success: true,
    prices: prices,
    // qwery: req.query.itemId,
    // price: price,
  });
};
