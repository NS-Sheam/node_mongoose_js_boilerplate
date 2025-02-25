import { Router } from "express";
import { CustomerController } from "./customer.controller.js";

const router = Router();

router.get("/", CustomerController.getAllCustomers);

export const CustomerRoutes = router;
