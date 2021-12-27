import express from "express";
const router = express.Router();
import { loginManager, getManagerPromotions, promoValidate } from "../controllers"
import { Auth } from "../middlewares";

router.post('/login', loginManager);
router.get('/getManagerPromotions', Auth("MANAGER"), getManagerPromotions);
router.patch('/promoValidate/:id', Auth("MANAGER"), promoValidate)



export { router };