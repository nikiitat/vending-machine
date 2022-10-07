import { Router } from "express";
import { getProducts, buyProductById } from "../controllers/vendingMachineController";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

router.get("/products-list", asyncHandler(getProducts));

router.get("/product", asyncHandler(buyProductById));

export default router;
