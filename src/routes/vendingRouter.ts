import { Router } from "express";
import { getProducts, buyProductByName } from "../controllers/vendingMachineController";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

router.get("/products-list", asyncHandler(getProducts));

router.get("/product", asyncHandler(buyProductByName));

export default router;
