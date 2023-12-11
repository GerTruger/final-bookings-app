import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import createReviews from "../services/reviews/createReviews.js";
import getReviewsById from "../services/reviews/getReviewsById.js";
import deleteReviews from "../services/reviews/deleteReviews.js";
import updateReviewsById from "../services/reviews/updateReviewsById.js";
import authMiddleware from "../middleware/auth.js";

const router = Router()

router.get("/", async (req, res, next) => {
    try {
        const reviews = await getReviews();
        res.json(reviews);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await getReviewsById(id);

        if (!review) {
            res.status(404).json({ message: `Review with id ${id} not found` });
        } else {
            res.status(200).json(review);
        }
    } catch (error) {
        next(error);
    }
});

router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const { userId, propertyId, rating, comment } = req.body;
        const newReview = await createReviews(userId, propertyId, rating, comment);
        res.status(201).json(newReview);
    } catch (error) {
        next(error);
    }
});


router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await deleteReviews(id);

        if (review) {
            res.status(200).send({
                message: `Review with id ${id} successfully deleted`,
                review,
            });
        } else {
            res.status(404).json({
                message: `Review with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, propertyId, rating, comment } = req.body;
        const review = await updateReviewsById(id, { userId, propertyId, rating, comment });

        if (review) {
            res.status(200).send({
                message: `Review with id ${id} successfully updated`,
            });
        } else {
            res.status(404).json({
                message: `Review with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

export default router;