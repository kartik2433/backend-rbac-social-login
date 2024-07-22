import { Router } from "express";
import bcrypt from "bcryptjs";
const { hashSync, compareSync } = bcrypt;
import jwt from "jsonwebtoken";
const { sign } = jwt;
import User from "../models/user.model.js";
import auth from "../middlewares/auth.middleware.js";
import rbac from "../middlewares/rbac.middleware.js";

import passport from '../config/passport-setup.js';

const router = Router();

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({
    username,
    email,
    password: hashSync(password, 10),
  });
  await user.save();
  res.status(201).json({ message: "User registered" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !compareSync(password, user.password)) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
});


router.get("/admin", auth, rbac(["admin"]), (req, res) => {
  res.json({ message: "Welcome, admin" });
});

// Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = sign(
      { _id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({message: "User Successfully Authenticated Using Google.", token });
  }
);

// GitHub
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req, res) => {
    const token = sign(
      { _id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({message: "User Successfully Authenticated Using Github." , token });
  }
);

// Microsoft
router.get(
  "/microsoft",
  passport.authenticate("microsoft", { scope: ["user.read"] })
);
router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft", { session: false }),
  (req, res) => {
    const token = sign(
      { _id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "User Successfully Authenticated Using Microsoft." , token });
  }
);



export default router;