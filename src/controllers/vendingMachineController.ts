import { Request, Response } from "express";

import { Change, coins, data, Product } from "../db/data";

const getProducts = async (req: Request, res: Response) => {
  const products = data.map((item) => {
    return { name: item.name, price: item.price };
  });

  res.json(products);
};

const buyProductById = async (req: Request, res: Response) => {
  const name = req.query.name as string;
  const cash = parseInt(req.query.cash as string);

  const product = data.find((item) => item.name === name);

  if (!validateProduct(name, cash, product)) {
    return res.status(404).json({ message: "Product is not available" });
  }

  if (!validateCash(cash, product?.price!))
    return res.status(404).json({ message: "Not enough money!" });

  const change = calculateChange(cash, product!);

  // updateProductAndBalance(product!, change);

  res.json({ product: { name: product!.name }, change });
};

const validateProduct = (name: string, cash: number, product?: Product) => {
  return product && product?.units > 0 ? true : false;
};

const validateCash = (cash: number, price: number) =>
  cash >= price ? true : false;

const calculateChange = (cash: number, product: Product) => {
  const countChange: Change = {
    1: 0,
    2: 0,
    5: 0,
    10: 0,
    20: 0,
    50: 0,
    100: 0,
    200: 0,
  };
  let balance = cash - product.price;

  [200, 100, 50, 20, 10, 5, 2, 1].forEach((n) => {
    let num = Math.floor(balance / n);
    balance = balance % n;
    countChange[n as keyof Change]! += num;
  });

  const change: Change = {};

  for (const count in countChange) {
    if (countChange[count as unknown as keyof Change] !== 0)
      change[count as unknown as keyof Change] =
        countChange[count as unknown as keyof Change];
  }

  return change;
};

const updateProductAndBalance = (product: Product, change: Change) => {
  product.units--;

  Object.entries(coins).forEach(([key, value]) => console.log(key, value));
};

export { getProducts, buyProductById };
