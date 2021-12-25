import express from "express";
const router = express.Router();
import { loginManager, getManagerPromotions } from "../controllers"
import { Auth } from "../middlewares";

router.post('/login', loginManager);
router.get('/getManagerPromotions', Auth("MANAGER"), getManagerPromotions);



export { router };