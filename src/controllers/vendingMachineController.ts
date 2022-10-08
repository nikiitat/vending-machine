import { Request, Response } from "express";

import { coins, products } from "../db/data";
import { Product, Change, Coins } from "../db/types";
import vendingMachineService from "../services/vendingService";

const getProducts = async (req: Request, res: Response) => {
  const data = products.map((item) => {
    return { name: item.name, price: item.price };
  });

  res.json(data);
};

const buyProductByName = async (req: Request, res: Response) => {
  const name = req.query.name as string;
  const cash = parseInt(req.query.cash as string);
  const product = products.find((item) => item.name === name);

  if (!vendingMachineService.validateProduct(name, cash, product)) {
    return res.status(404).json({ message: "Product is not available" });
  }

  if (!vendingMachineService.validateCash(cash, product?.price!))
    return res.status(404).json({ message: "Not enough money!" });

  const change = vendingMachineService.handleOrder(product!, cash);

  res.json({ product: { name: product!.name }, change });
};

export { getProducts, buyProductByName };
