import { Request, Response } from "express";

import { coins, products } from "../db/data";
import { Coins, Product } from "../db/types";
import { BadRequest } from "../middleware/errorHandler";
import vendingMachineService from "../services/vendingService";

const getProducts = async (req: Request, res: Response) => {
  console.log(coins);
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
    return res.status(404).json({ message: "Product is not available", cash });
  }

  if (!vendingMachineService.validateCash(cash, product?.price!))
    return res.status(404).json({ message: "Not enough money!", cash });

  const change = vendingMachineService.handleOrder(product!, cash);

  res.status(200).json({ product: { name: product!.name }, change });
};

const reloadProducts = async ({ body }: Request, res: Response) => {
  const newProducts: Product[] = body;

  vendingMachineService.reloadProducts(newProducts);

  res.status(200).json(products);
};

const reloadCoins = async (req: Request, res: Response) => {
  const newCoins = req.body as Coins;

  vendingMachineService.reloadCoins(newCoins);

  res.status(200).json(coins);
};

export { getProducts, buyProductByName, reloadProducts, reloadCoins };
