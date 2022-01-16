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
    getAllPromotions
} from "../controllers";
import { Auth, checkAuth } from "../middlewares";

router.post("/createSubAdmin", Auth("ADMIN"), createSubAdmin);// create subAdmin
router.post("/login", loginAdmin);//login
router.get("/logs", getStats);//get statistics
router.get("/checkAuth", checkAuth("ADMIN")); // Check if autheticated with token
router.get("/getCenters", Auth("ADMIN"), getCenters); // get all centers
router.get("/centersPromotions", Auth("ADMIN"), getCentersPromotions); //get All promotion and his centers
router.get("/getAllSubAdmin", Auth("ADMIN"), getAllSubAdmin); //get all subAdmins
router.put("/removeCenter/:id", Auth("ADMIN"), removeCenter); //remove connection between center and subAdmin
router.delete("/deleteSubAdmin/:id", Auth("ADMIN"), deleteSubAdmin); //delete sub admin
router.get("/getSubAdmin/:id", Auth("ADMIN"), getSubAdmin); //get subAdmin by id
router.put("/updateSubAdmin/:id", Auth("ADMIN"), updateSubAdmin); //update subAdmin
router.get("/getAllPromotions", getAllPromotions); 
export { router };
