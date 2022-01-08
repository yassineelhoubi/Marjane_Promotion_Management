import express from "express";
const router = express.Router();
import { createSubAdmin, loginAdmin, getStats, getCenters } from "../controllers";
import { Auth, checkAuth } from "../middlewares";

router.post("/createSubAdmin", Auth("ADMIN"), createSubAdmin);
router.post("/login", loginAdmin);
router.get("/logs", getStats);
router.post("/checkAuth", checkAuth)
router.get("/getCenters", Auth("ADMIN"), getCenters)
export { router };
