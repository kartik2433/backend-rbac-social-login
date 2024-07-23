import dotenv from 'dotenv'; // Load environment variables from .env file
dotenv.config();
import express, { json } from "express";
import { connect } from "mongoose";
import passport from './config/passport-setup.js';

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js"

const app = express();
const PORT = process.env.PORT || 5000;

// console.log("Index.js -> ",process.env.GOOGLE_CLIENT_ID);

app.use(json());

app.use(passport.initialize());


// Connect to MongoDB
connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes)

app.get("/",(req,res) => {
  res.json({message: "Hello World...!"})
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));