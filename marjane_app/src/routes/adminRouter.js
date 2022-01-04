import express from "express";
const router = express.Router();
import { createSubAdmin, loginAdmin, getStats } from "../controllers";
import { Auth } from "../middlewares";

router.post("/createSubAdmin", Auth("ADMIN"), createSubAdmin);
router.post("/login", loginAdmin);
router.get("/logs", getStats);
export { router };
