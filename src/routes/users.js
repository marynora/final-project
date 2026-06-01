import { Router } from "express";
import auth from "../middleware/auth.js";
import createUser from "../services/users/createUser.js";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import updateUser from "../services/users/updateUser.js";
import deleteUser from "../services/users/deleteUser.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { username, email } = req.query;

    const users = await getUsers(username, email);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, pictureUrl } =
      req.body;
      
  if (
    !username ||
    !password ||
    !name ||
    !email ||
    !phoneNumber ||
    !pictureUrl
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

    const user = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
    );

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const existingUser = await getUserById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username, password, name, email, phoneNumber, pictureUrl } =
      req.body;

    const user = await updateUser(
      req.params.id,
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
    );

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const existingUser = await getUserById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = await deleteUser(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
