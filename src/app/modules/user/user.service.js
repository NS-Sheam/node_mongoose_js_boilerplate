import mongoose from "mongoose";
import { USER_ROLES } from "./user.const.js";
import AppError from "../../errors/appError.js";
import { StatusCodes } from "http-status-codes";
import { User } from "./user.model.js";
import { PasswordHelper } from "../../utils/passwordHelpers.js";
import { Agent } from "../agent/agent.model.js";
import { Customer } from "../customer/customer.model.js";
import { Admin } from "../admin/admin.model.js";

const createUser = async (payload) => {
  const { password, agent, customer } = payload;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    let userType;
    if (agent) {
      userType = USER_ROLES.AGENT;
    } else if (customer) {
      userType = USER_ROLES.CUSTOMER;
    } else {
      throw new AppError(StatusCodes.BAD_REQUEST, "User type is required");
    }

    const hashedPassword = await PasswordHelper.hashedPassword(password);
    if (!hashedPassword) {
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Error hashing password");
    }

    let userPayload = {
      password: hashedPassword,
      role: userType,
    };
    if (agent) {
      userPayload = { ...userPayload, ...agent };
    } else if (customer) {
      userPayload = { ...userPayload, ...customer };
    }

    const user = await User.create([userPayload], { session, new: true });

    if (!user) {
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Error creating user");
    }

    let result;

    if (agent) {
      const agentPayload = {
        user: user[0]._id,
        ...agent,
      };

      result = await Agent.create([agentPayload], { session, new: true });
      if (!result) {
        throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Error creating agent");
      }
    } else if (customer) {
      const customerPayload = {
        user: user[0]._id,
        ...customer,
        isVerified: true,
      };
      result = await Customer.create([customerPayload], { session, new: true });
      if (!result) {
        throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Error creating customer");
      }
    }

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getMe = async (user) => {
  const userRole = user.role;

  let result;

  if (userRole === USER_ROLES.AGENT) {
    result = await Agent.findOne({ user: user.id }).populate({
      path: "user",
      select: "-password",
    });
  } else if (userRole === USER_ROLES.CUSTOMER) {
    result = await Customer.findOne({ user: user.id }).populate({
      path: "user",
      select: "-password",
    });
  } else if (userRole === USER_ROLES.ADMIN) {
    result = await Admin.findOne({ user: user.id }).populate({
      path: "user",
      select: "-password",
    });
  }

  return result;
};

export const UserService = { createUser, getMe };
