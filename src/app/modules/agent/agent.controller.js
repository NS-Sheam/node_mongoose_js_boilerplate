import { StatusCodes } from "http-status-codes";
import { AgentService } from "./agent.service.js";
import catchAsync from "../../middlewares/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";

const getAllAgents = catchAsync(async (req, res) => {
  const result = await AgentService.getAllAgents(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User is logged in successfully",
    meta: result?.meta,
    data: result?.result,
  });
});

export const AgentController = { getAllAgents };
