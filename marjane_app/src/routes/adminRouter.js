import express from "express";
const router = express.Router();
import {test} from "../controllers"

router.get('/getCenter',test);
router.post('/createCenterAdmin' , test);
router.post('/auth', test);


export  { router};