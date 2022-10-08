import { Router } from "express";

import {
  getProducts,
  buyProductByName,
  reloadProducts,
  reloadCoins,
} from "../controllers/vendingMachineController";
import asyncHandler from "../middleware/asyncHandler";
import auth from "../middleware/auth";

const router = Router();

router.get("/products-list", asyncHandler(getProducts));

router.get("/product", asyncHandler(buyProductByName));

router.use(auth);

router.patch("/products", asyncHandler(reloadProducts));

router.patch("/coins", asyncHandler(reloadCoins));

export default router;
