import { model, Schema } from "mongoose";
import { USER_ROLES } from "./user.const.js";
const userSchema = new Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    deviceId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);
