import { StatusCodes } from "http-status-codes";
import catchAsync from "../../middlewares/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { AuthService } from "./auth.service.js";

const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await AuthService.login(req.body);

  res.cookie("refreshToken", refreshToken, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "none",
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User is logged in successfully",
    data: { accessToken, refreshToken },
  });
});

export const AuthController = { login };
