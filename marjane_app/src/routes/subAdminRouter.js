import express from "express";
const router = express.Router();
import {
    loginSubAdmin,
    createManager,
    createPromo,
    getAllManagerCenter,
    idFromToken,
} from "../controllers";

import { Auth } from "../middlewares";

router.post("/login", loginSubAdmin);
router.post("/createManager", Auth("SUBADMIN"), createManager);
router.post("/createPromo", Auth("SUBADMIN"), createPromo);
router.get("/getAllManagerCenter",Auth("SUBADMIN"),idFromToken("SUBADMIN"), getAllManagerCenter); // Bring all manager to the center of this subAdmin

export { router };
