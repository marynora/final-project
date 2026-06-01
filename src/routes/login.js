import { Router } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.AUTH_SECRET_KEY
    );

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
