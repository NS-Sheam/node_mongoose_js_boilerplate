import bcrypt from "bcrypt";

import { StatusCodes } from "http-status-codes";
import AppError from "../errors/appError.js";
import config from "../config/index.js";

const hashedPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    return hashedPassword;
  } catch {
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Error hashing password");
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    return isPasswordMatch;
  } catch {
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Error comparing password");
  }
};

export const PasswordHelper = { hashedPassword, comparePassword };
