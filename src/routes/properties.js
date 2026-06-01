import { Router } from "express";
import auth from "../middleware/auth.js";

import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updateProperty from "../services/properties/updateProperty.js";
import deleteProperty from "../services/properties/deleteProperty.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight } = req.query;

    const properties = await getProperties(location, pricePerNight);

    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const property = await getPropertyById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      hostId,
    } = req.body;

    if (
      !title ||
      !description ||
      !location ||
      pricePerNight === undefined ||
      bedroomCount === undefined ||
      bathRoomCount === undefined ||
      maxGuestCount === undefined ||
      rating === undefined ||
      !hostId
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const property = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      hostId,
    );

    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const existingProperty = await getPropertyById(req.params.id);

    if (!existingProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      hostId,
    } = req.body;

    const property = await updateProperty(
      req.params.id,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      hostId,
    );

    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const existingProperty = await getPropertyById(req.params.id);

    if (!existingProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    const property = await deleteProperty(req.params.id);

    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
});

export default router;
