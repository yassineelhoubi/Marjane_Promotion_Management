import express from "express";
const router = express.Router();
import {
    createSubAdmin,
    loginAdmin,
    getStats,
    getCenters,
    getCentersPromotions,
    getAllSubAdmin,
    removeCenter,
    deleteSubAdmin,
    getSubAdmin,
    updateSubAdmin,
} from "../controllers";
import { Auth, checkAuth } from "../middlewares";

router.post("/createSubAdmin", Auth("ADMIN"), createSubAdmin);// create subAdmin
router.post("/login", loginAdmin);//login
router.get("/logs", getStats);//get statistics
router.post("/checkAuth", checkAuth); // Check if autheticated with token
router.get("/getCenters", Auth("ADMIN"), getCenters); // get all centers
router.get("/centersPromotions", getCentersPromotions); //get All promotion and his centers
router.get("/getAllSubAdmin", getAllSubAdmin); //get all subAdmins
router.put("/removeCenter/:id", removeCenter); //remove connection between center and subAdmin
router.delete("/deleteSubAdmin/:id", deleteSubAdmin); //delete sub admin
router.get("/getSubAdmin/:id", getSubAdmin); //get subAdmin by id
router.put("/updateSubAdmin/:id", updateSubAdmin); //update subAdmin
export { router };
