import express from "express";
const router = express.Router();
import {testSubAdmin} from "../controllers"

router.get('/testSubAdmin',testSubAdmin);



export  { router};