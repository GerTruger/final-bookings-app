import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import createUsers from "../services/users/createUsers.js";
import getUsersById from "../services/users/getUsersById.js";
import deleteUsers from "../services/users/deleteUsers.js";
import updateUsersById from "../services/users/updateUsersById.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const { username, email } = req.query; // Haal zoekcriteria op uit het verzoek
        const users = await getUsers(username, email);

        res.json(users);
    } catch (error) {
        next(error);
    }
});


router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUsersById(id);

        if (!user) {
            res.status(404).json({ message: `User with id ${id} not found` });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        next(error);
    }
});

router.post("/", authMiddleware, async (req, res, next) => {
    try {
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;
        const newUser = await createUsers(username, password, name, email, phoneNumber, profilePicture);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});


router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await deleteUsers(id);

        if (user) {
            res.status(200).send({
                message: `User with id ${id} successfully deleted`,
                user,
            });
        } else {
            res.status(404).json({
                message: `User with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;
        const user = await updateUsersById(id, { username, password, name, email, phoneNumber, profilePicture });

        if (user) {
            res.status(200).send({
                message: `User with id ${id} successfully updated`,
            });
        } else {
            res.status(404).json({
                message: `User with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

export default router;