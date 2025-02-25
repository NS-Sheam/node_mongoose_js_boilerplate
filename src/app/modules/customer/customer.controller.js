import { StatusCodes } from "http-status-codes";
import { CustomerService } from "./customer.service.js";
import catchAsync from "../../middlewares/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";

const getAllCustomers = catchAsync(async (req, res) => {
  const result = await CustomerService.getAllCustomers(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User is logged in successfully",
    meta: result?.meta,
    data: result?.result,
  });
});

export const CustomerController = { getAllCustomers };
