import jwt from "jsonwebtoken";
import User from "../models/User.js";
export async function signup(req, res) {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const idx = Math.floor(Math.random() * 100) + 1; // generate a num between 1–100
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await User.create({
      fullName,
      email,
      password,
      avatar: randomAvatar,
    });

    const token = jwt.sign({ UserId: newUser._id }, process.env.JWT_SECRET_KEY,{
      expiresIn: "7d"
    });
    res.cookie("token",token,{
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      sameSite:"strict",
      maxAge:7*24*60*60*1000
    })
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function login(req, res) {
  res.send("login");
}

export async function logout(req, res) {
  res.send("logout");
}
