import { Router } from "express";
import auth from "../middleware/auth.js";

import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReview from "../services/reviews/updateReview.js";
import deleteReview from "../services/reviews/deleteReview.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const review = await getReviewById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;

    if (!userId || !propertyId || rating === undefined || !comment) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const review = await createReview(userId, propertyId, rating, comment);

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const existingReview = await getReviewById(req.params.id);

    if (!existingReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    const { userId, propertyId, rating, comment } = req.body;

    const review = await updateReview(
      req.params.id,
      userId,
      propertyId,
      rating,
      comment,
    );

    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const existingReview = await getReviewById(req.params.id);

    if (!existingReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    
    const review = await deleteReview(req.params.id);

    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});

export default router;
