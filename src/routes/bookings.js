import { Router } from "express";
import auth from "../middleware/auth.js";

import getBookings from "../services/bookings/getBookings.js";
import getBookingById from "../services/bookings/getBookingById.js";
import createBooking from "../services/bookings/createBooking.js";
import updateBooking from "../services/bookings/updateBooking.js";
import deleteBooking from "../services/bookings/deleteBooking.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.query;

    const bookings = await getBookings(userId);

    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const booking = await getBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;

    if (
      !userId ||
      !propertyId ||
      !checkinDate ||
      !checkoutDate ||
      numberOfGuests === undefined ||
      totalPrice === undefined ||
      !bookingStatus
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const booking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    );

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try { 
    const existingBooking = await getBookingById(req.params.id);

    if (!existingBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;

    const booking = await updateBooking(
      req.params.id,
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    );

    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const existingBooking = await getBookingById(req.params.id);

    if (!existingBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const booking = await deleteBooking(req.params.id);

    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
});

export default router;
