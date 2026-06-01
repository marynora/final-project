import { Router } from "express";
import auth from "../middleware/auth.js";

import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHost from "../services/hosts/updateHost.js";
import deleteHost from "../services/hosts/deleteHost.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;

    const hosts = await getHosts(name);

    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const host = await getHostById(req.params.id);

    if (!host) {
      return res.status(404).json({ message: "Host not found" });
    }

    res.status(200).json(host);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
      aboutMe,
    } = req.body;

    if (
      !username ||
      !password ||
      !name ||
      !email ||
      !phoneNumber ||
      !pictureUrl ||
      !aboutMe
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const host = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
      aboutMe,
    );

    res.status(201).json(host);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const existingHost = await getHostById(req.params.id);

    if (!existingHost) {
      return res.status(404).json({ message: "Host not found" });
    }

    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
      aboutMe,
    } = req.body;

    const host = await updateHost(
      req.params.id,
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
      aboutMe,
    );

    res.status(200).json(host);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const existingHost = await getHostById(req.params.id);

    if (!existingHost) {
      return res.status(404).json({ message: "Host not found" });
    }

    const host = await deleteHost(req.params.id);

    res.status(200).json(host);
  } catch (error) {
    next(error);
  }
});

export default router;