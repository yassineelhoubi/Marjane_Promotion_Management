import express from "express";
const router = express.Router();
import {testDepartmentManager} from "../controllers"

router.get('/testDepartmentManager',testDepartmentManager);



export  { router};