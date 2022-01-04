import express from "express";
const router = express.Router();
import { loginSubAdmin, createManager, createPromo } from "../controllers";
import { Auth } from "../middlewares";

router.post("/login", loginSubAdmin);
router.post("/createManager", Auth("SUBADMIN"), createManager);
router.post("/createPromo", Auth("SUBADMIN"), createPromo);

export { router };
