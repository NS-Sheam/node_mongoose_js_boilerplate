import mongoose from "mongoose";
import { Admin } from "../modules/admin/admin.model.js";
import { User } from "../modules/user/user.model.js";
import { USER_ROLES } from "../modules/user/user.const.js";
import { PasswordHelper } from "../utils/passwordHelpers.js";
import config from "../config/index.js";

const adminData = {
  name: config.admin_name,
  email: config.admin_email,
  mobileNumber: config.admin_mobile_number,
  password: config.admin_password,
  role: "admin",
  isActive: true,
  isVerified: true,
};

const seedAdmin = async () => {
  const session = await mongoose.startSession();

  try {
    const isAlreadyExist = await User.findOne({ role: USER_ROLES.ADMIN });
    if (isAlreadyExist) {
      return;
    }
    await session.startTransaction();

    const hashedPassword = await PasswordHelper.hashedPassword(adminData.password);
    if (!hashedPassword) {
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Error hashing password");
    }
    adminData.password = hashedPassword;

    const admin = await User.create([adminData], { session, new: true });
    if (!admin) {
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Error creating admin");
    }
    const adminPayload = {
      user: admin[0]._id,
      ...adminData,
    };
    const result = await Admin.create([adminPayload], { session, new: true });
    if (!result) {
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Error creating admin");
    }
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export default seedAdmin;
