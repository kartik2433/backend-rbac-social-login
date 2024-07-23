import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  password: { type: String},
  role: {
    type: String,
    enum: ["admin", "customer", "reviewer", "guest"],
    default: "guest",
  },
  googleId: String,
  githubId: String,
  microsoftId: String,
});

UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

export default model("User", UserSchema);