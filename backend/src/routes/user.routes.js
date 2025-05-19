import express from "express";
const router = express.Router();
import { protectRoute } from "../middlewares/auth.middleware.js";
import { acceptFriendRequest, getRecommendedUsers, getMyfriends, sendFriendRequest } from "../controllers/user.controller.js";
router.use(protectRoute)
router.get("/",getRecommendedUsers);
router.get("/friends",getMyfriends);
router.post("/friend-request/:id", sendFriendRequest);
router.put("/accept-friend-request/:id", acceptFriendRequest);
export default router;