import getBookings from '../services/bookings/getBookings.js'
import createBookings from '../services/bookings/createBookings.js'
import getBookingsById from '../services/bookings/getBookingsById.js'
import updateBookingsById from '../services/bookings/updateBookingsById.js'
import deleteBookings from '../services/bookings/deleteBookings.js'
import authMiddleware from '../middleware/auth.js';
import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const { userId } = req.query
        const bookings = await getBookings(userId);

        res.json(bookings);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = await getBookingsById(id);

        if (!booking) {
            res.status(404).json({ message: `Booking with id ${id} not found` });
        } else {
            res.status(200).json(booking);
        }
    } catch (error) {
        next(error);
    }
});

router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
        const newBooking = await createBookings(userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus);
        res.status(201).json(newBooking);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = await deleteBookings(id);

        if (booking) {
            res.status(200).send({
                message: `Booking with id ${id} successfully deleted`,
                booking,
            });
        } else {
            res.status(404).json({
                message: `Booking with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
        const booking = await updateBookingsById(id, { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus });

        if (booking) {
            res.status(200).send({
                message: `Booking with id ${id} successfully updated`,
            });
        } else {
            res.status(404).json({
                message: `Booking with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

export default router;