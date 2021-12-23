import express from "express";
const router = express.Router();
import {loginSubAdmin} from "../controllers"

router.post('/login',loginSubAdmin);



export  { router};