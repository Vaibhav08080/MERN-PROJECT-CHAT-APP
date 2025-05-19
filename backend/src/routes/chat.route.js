import { protectRoute } from "../middlewares/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";
import express from "express";
const router = express.Router();

router.get("/token",protectRoute,getStreamToken);

export default router;