import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import JwtDecoded from "../../types/JwtDecoded";

import prisma from "../../utils/prisma";

const getWatchlist = async (req: Request, res: Response) => {
  const secret = process.env.JWT_SECRET;

  const token = req.header("auth-token");

  try {
    if (token === "undefined" || token === null) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const decoded: any = jwt.verify(token!, secret!);

    const watchlistData = await prisma.watchlist.findUnique({
      where: { itemId: req.params.id },
    });

    if (!watchlistData) {
      res.status(200).json({ success: true, data: null });
      return;
    }
    res.status(200).json({ success: true, data: watchlistData });
  } catch (e: any) {
    res.status(500).json({ success: false });
    throw new Error("Error in get watchlist " + e);
  }
};

export default getWatchlist;
