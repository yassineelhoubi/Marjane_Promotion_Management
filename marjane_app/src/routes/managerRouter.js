import express from "express";
const router = express.Router();
import { loginManager, getManagerPromotions, promoValidate } from "../controllers"
import { Auth, checkAuth } from "../middlewares";

router.post('/login', loginManager);
router.get('/getManagerPromotions', Auth("MANAGER"), getManagerPromotions);// Get All Promotion to the Category of this Manager
router.patch('/promoValidate/:id', Auth("MANAGER"), promoValidate);
router.get("/checkAuth", checkAuth("MANAGER")); // Check if autheticated with token



export { router };