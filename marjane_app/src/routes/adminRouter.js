import express from "express";
const router = express.Router();
import { createSubAdmin, loginAdmin } from "../controllers";
import { Auth } from "../middlewares";

router.post("/createSubAdmin", createSubAdmin);
router.post("/login", loginAdmin);

export { router };
