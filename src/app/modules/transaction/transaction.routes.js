import { Router } from "express";
import { TransactionController } from "./transaction.controller.js";

const router = Router();

router.get("/", TransactionController.getAllTransactions);
router.post("/send-money", TransactionController.sendMoney);
router.post("/cash-out", TransactionController.cashOut);
export const TransactionRoutes = router;
