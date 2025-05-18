import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
    try {
        // 1. Get token from cookies
        const token = req.cookies?.token;
        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        // 2. Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log('Decoded token:', decoded);
        } catch (jwtError) {
            console.error('JWT verification failed:', jwtError);
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        // 3. Debug: Log the entire decoded token
        console.log('Full decoded token:', JSON.stringify(decoded, null, 2));
        
        // 4. Get user ID - handle both UserId and sub (standard JWT claim)
        const userId = decoded.UserId || decoded.sub;
        if (!userId) {
            console.error('No user ID found in token');
            return res.status(401).json({ message: "Unauthorized - Invalid token format" });
        }

        // 5. Find user
        const user = await User.findById(userId).select("-password");
        if (!user) {
            console.log('User not found for ID:', userId);
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        // 4. Attach user to request
        req.user = user;
        next();
        
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
