import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET;
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id, userId: user.userId }, secret!, {
    expiresIn: "24h",
  });

  const { password: pwd, ...userInfo } = user;

  console.log("pwd");

  res.setHeader("x-auth-token", token);

  res
    .header("auth-token", token)
    .json({ success: true, message: "Logged in", data: userInfo });
};

export default loginUser;
