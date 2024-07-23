import cache from "../cache.js";
import { Router } from "express";
import User from '../models/user.model.js'
import auth from "../middlewares/auth.middleware.js";
import rbac from "../middlewares/rbac.middleware.js";

const router = Router();

const checkCache = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const data = await cache.get(userId);
    if (data !== null) {
      res.json({ message: "User Got From Cache", data: JSON.parse(data) });
    } else {
      next();
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

router.get(
  "/:userId",
  auth,
  rbac(["admin", "customer"]),
  checkCache,
  async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).select("_id username email role");
      cache.setEx(userId, 3600, JSON.stringify(user));
      res.json({ message: "User Got From MongoDb", data: user});
    } catch (err) {
        console.log(err)
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;