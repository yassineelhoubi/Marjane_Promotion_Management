import express from "express";
const router = express.Router();
import {loginSubAdmin, createManager} from "../controllers"
import { Auth } from "../middlewares";

router.post('/login',loginSubAdmin);
router.post('/createManager', Auth("SUBADMIN"), createManager);



export  { router};