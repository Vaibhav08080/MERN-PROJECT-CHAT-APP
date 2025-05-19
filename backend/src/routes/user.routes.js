import express from "express";
const router = express.Router();
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getRecommendedUsers, getMyfriends, sendFriendRequest } from "../controllers/user.controller.js";
router.use(protectRoute)
router.get("/",getRecommendedUsers);
router.get("/friends",getMyfriends);
router.post("/friend-request/:id", sendFriendRequest);
export default router;