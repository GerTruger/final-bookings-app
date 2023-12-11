import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenitiesById from "../services/amenities/getAmenitiesById.js";
import deleteAmenities from "../services/amenities/deleteAmenities.js";
import updateAmenitiesById from "../services/amenities/updateAmenitiesById.js";
import authMiddleware from "../middleware/auth.js";
import createAmenitie from "../services/amenities/createAmenities.js";

const router = Router();   

router.get("/", async (req, res, next) => {
  try {
      const amenities = await getAmenities();
      res.json(amenities);
  } catch (error) {
      next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
      const { id } = req.params;
      const amenity = await getAmenitiesById(id);

      if (!amenity) {
          res.status(404).json({ message: `Amenitie with id ${id} not found` });
      } else {
          res.status(200).json(amenity);
      }
  } catch (error) {
      next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
      const { name } = req.body;
      const newAmenity = await createAmenitie(name);
      res.status(201).json(newAmenity);
  } catch (error) {
      next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
      const { id } = req.params;
      const amenity = await deleteAmenities(id);

      if (amenity) {
          res.status(200).send({
              message: `Amenitie with id ${id} successfully deleted`,
              amenity,
          });
      } else {
          res.status(404).json({
              message: `Amenitie with id ${id} not found`,
          });
      }
  } catch (error) {
      next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
      const { id } = req.params;
      const { name } = req.body;
      const amenity = await updateAmenitiesById(id, { name });

      if (amenity) {
          res.status(200).send({
              message: `Amenitie with id ${id} successfully updated`,
          });
      } else {
          res.status(404).json({
              message: `Amenitie with id ${id} not found`,
          });
      }
  } catch (error) {
      next(error);
  }
});

export default router;