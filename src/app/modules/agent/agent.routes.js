import { Router } from "express";
import { AgentController } from "./agent.controller.js";

const router = Router();

router.get("/", AgentController.getAllAgents);

export const AgentRoutes = router;
