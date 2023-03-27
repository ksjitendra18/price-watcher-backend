import { Request, Response } from "express";
import { customAlphabet } from "nanoid";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";

const signupUser = async (req: Request, res: Response) => {
  const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    15
  );

  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await prisma.user.create({
    data: {
      userId: nanoid(),
      email,
      password: hashedPassword,
    },

    select: {
      userId: true,
      email: true,
    },
  });
  user;
  res.status(201).json({ success: true, user });
};

export default signupUser;
