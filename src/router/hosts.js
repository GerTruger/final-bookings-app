import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import createHosts from "../services/hosts/createHosts.js";
import getHostsById from "../services/hosts/getHostsById.js";
import deleteHosts from "../services/hosts/deleteHosts.js";
import updateHostsById from "../services/hosts/updateHostsById.js";
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const { name } = req.query
        const hosts = await getHosts(name);
        res.json(hosts);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const host = await getHostsById(id);

        if (!host) {
            res.status(404).json({ message: `Host with id ${id} not found` });
        } else {
            res.status(200).json(host);
        }
    } catch (error) {
        next(error);
    }
});

router.post("/",authMiddleware, async (req, res, next) => {
    try {
        const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;
        const newHost = await createHosts(username, password, name, email, phoneNumber, profilePicture, aboutMe);
        res.status(201).json(newHost);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const host = await deleteHosts(id);

        if (host) {
            res.status(200).send({
                message: `Host with id ${id} successfully deleted`,
                host,
            });
        } else {
            res.status(404).json({
                message: `Host with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;
        const host = await updateHostsById(id, { username, password, name, email, phoneNumber, profilePicture, aboutMe });

        if (host) {
            res.status(200).send({
                message: `Host with id ${id} successfully updated`,
            });
        } else {
            res.status(404).json({
                message: `Host with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});

export default router;
