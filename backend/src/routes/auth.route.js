import express from "express";
import { signup, login, logout, onBoard } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Protected route (requires authentication)
router.post("/onBoard", protectRoute, onBoard);
router.get("/me", protectRoute, (req, res) => {
    res.status(200).json({ success: true, user: req.user }); 
});

export default router;
