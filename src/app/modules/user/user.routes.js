import { Router } from "express";
import { UserController } from "./user.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();

router.post("/", UserController.createUser);
router.get("/me", auth(), UserController.getMe);
export const UserRoutes = router;
