import express from "express";
const router = express.Router();
import { test } from "../controllers";
import { Auth } from "../middlewares";

router.get("/getCenter", Auth(), test);
router.post("/createCenterAdmin", test);
router.get("/auth", test);

export { router };
