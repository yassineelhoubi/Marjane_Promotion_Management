import express from "express";
const router = express.Router();
import { loginManager } from "../controllers"

router.post('/login', loginManager);



export { router };