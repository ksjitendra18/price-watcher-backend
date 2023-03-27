import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prisma";

const getAllWatchlist = async (req: Request, res: Response) => {
  const secret = process.env.JWT_SECRET;

  const token = req.header("auth-token");

  try {
    if (token === "undefined" || token === null) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const decoded: any = jwt.verify(token!, secret!);

    const allWatchlist = await prisma.watchlist.findMany({
      where: { userId: decoded.userId },
    });

    if (allWatchlist.length < 1) {
      res.status(200).json({ success: true, data: [] });
      return;
    }
    res.status(200).json({ success: true, data: allWatchlist });
  } catch (e: any) {
    res.status(500).json({ success: false });
    throw new Error("Error in get all watchlist " + e);
  }
};

export default getAllWatchlist;
