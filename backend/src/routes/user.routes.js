import express from "express";
const router = express.Router();
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getRecommendedUsers, getMyfriends } from "../controllers/user.controller.js";
router.use(protectRoute)
router.get("/",getRecommendedUsers);
router.get("/friends",getMyfriends);
export default router;