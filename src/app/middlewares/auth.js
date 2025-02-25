import { StatusCodes } from "http-status-codes";

import catchAsync from "./catchAsync.js";
import AppError from "../errors/appError.js";
import { User } from "../modules/user/user.model.js";
import { JwtHelpers } from "../utils/jwtHelpers.js";
import config from "../config/index.js";

const auth = (...roles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
    }

    const verifiedUser = JwtHelpers.verifyToken(token, config.jwt.access_secret);

    const isUserExist = await User.findById(verifiedUser.id);

    if (!isUserExist || !isUserExist.isActive) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
    }

    if (isUserExist.deviceId && isUserExist.deviceId !== verifiedUser.deviceId) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "You are logged in from another device. Please log out from the other device first."
      );
    }

    req.user = verifiedUser;

    if (roles.length && !roles.includes(verifiedUser.role)) {
      throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
    }

    next();
  });
};

export default auth;
