import { StatusCodes } from "http-status-codes";
import { TransactionService } from "./transaction.service.js";
import catchAsync from "../../middlewares/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";

const getAllTransactions = catchAsync(async (req, res) => {
  const result = await TransactionService.getAllTransactions(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User is logged in successfully",
    meta: result?.meta,
    data: result?.result,
  });
});

const sendMoney = catchAsync(async (req, res) => {
  const result = await TransactionService.sendMoney(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Money sent successfully",
    data: result,
  });
});

const cashOut = catchAsync(async (req, res) => {
  const result = await TransactionService.cashOut(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Cash out successfully",
    data: result,
  });
});

export const TransactionController = { getAllTransactions, sendMoney, cashOut };
