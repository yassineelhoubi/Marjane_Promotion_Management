import express from "express";
const router = express.Router();
import {
    loginSubAdmin,
    createManager,
    createPromo,
    getAllManagerCenter,
    idFromToken,
    getCategoriesCenter,
    deleteManager,
    updateManager,
    getManager,
} from "../controllers";

import { Auth, checkAuth } from "../middlewares";

router.post("/login", loginSubAdmin);
router.post("/createManager", Auth("SUBADMIN"), createManager);
router.post("/createPromo", Auth("SUBADMIN"), createPromo);
router.get("/checkAuth", checkAuth("SUBADMIN")); // Check if autheticated with token
router.get("/getAllManagerCenter", Auth("SUBADMIN"), idFromToken("SUBADMIN"), getAllManagerCenter); // Bring all manager to the center of this subAdmin
router.get("/getCategoriesCenter", Auth("SUBADMIN"), idFromToken("SUBADMIN"), getCategoriesCenter); // Bring all categories to the center of this subAdmin
router.delete("/deleteManager/:id", Auth("SUBADMIN"), deleteManager); // Delete Manager 
router.put("/updateManager/:id", Auth("SUBADMIN"), updateManager); // Update Manager info
router.get("/getManager/:id", getManager); // Get a manager with category name by Id

export { router };
