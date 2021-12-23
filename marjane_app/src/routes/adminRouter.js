import express from "express";
const router = express.Router();
import { createSubAdmin } from "../controllers";
import { Auth } from "../middlewares";

router.post("/createSubAdmin", createSubAdmin);

export { router };
