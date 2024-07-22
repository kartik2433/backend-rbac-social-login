import dotenv from 'dotenv'; // Load environment variables from .env file
dotenv.config();
import express, { json } from "express";
import { connect } from "mongoose";
const app = express();
const PORT = process.env.PORT || 5000;

// console.log("Index.js -> ",process.env.GOOGLE_CLIENT_ID);
import passport from './config/passport-setup.js';

import authRoutes from "./routes/auth.route.js";
// import passport from "passport";

app.use(json());

app.use(passport.initialize());


// Connect to MongoDB
connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));