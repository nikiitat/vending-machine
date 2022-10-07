import { Router } from "express";
import { getVendingMachine } from "../controllers/vendingMachineController";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getVendingMachine));

export default router;
