import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import createProperties from "../services/properties/createProperties.js";
import getPropertiesById from "../services/properties/getPropertiesById.js";
import deleteProperties from "../services/properties/deleteProperties.js";
import updatePropertiesById from "../services/properties/updatePropertiesById.js";
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const { location, pricePerNight } = req.query
        const properties = await getProperties(location, pricePerNight);
        res.json(properties);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const property = await getPropertiesById(id);

        if (!property) {
            res.status(404).json({ message: `Property with id ${id} not found` });
        } else {
            res.status(200).json(property);
        }
    } catch (error) {
        next(error);
    }
});

router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating } = req.body;
        const newProperty = await createProperties(title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating);
        res.status(201).json(newProperty);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const property = await deleteProperties(id);

        if (property) {
            res.status(200).send({
                message: `Property with id ${id} successfully deleted`,
                property,
            });
        } else {
            res.status(404).json({
                message: `Property with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating } = req.body;
        const property = await updatePropertiesById(id, { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating });

        if (property) {
            res.status(200).send({
                message: `Property with id ${id} successfully updated`,
            });
        } else {
            res.status(404).json({
                message: `Property with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

export default router;