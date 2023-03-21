import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET;

const authStatus = async (req: Request, res: Response) => {
  const token = req.header("auth-token");

  try {
    console.log("inside try", token);

    if (token === "undefined" || token === null) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const decoded: any = jwt.verify(token!, secret!);

    const user = await prisma.user.findUnique({
      where: { userId: decoded.userId },
      select: { id: true, email: true, userId: true },
    });

    res.status(200).json({ success: true, data: { user } });
  } catch (e: any) {
    throw new Error(e);
  }
};

export default authStatus;

// if (token === "undefined" || token === null) {
//   return res.status(401).json({ message: "Unauthorized" });
// } else {
//   const decoded: any = jwt.decode(token!);

//   res.status(200).json({ success: true, data: { userId: decoded.userId } });
// }
