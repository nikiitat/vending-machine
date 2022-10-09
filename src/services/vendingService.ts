import { coins, products } from "../db/data";
import { Change, Coins, Product } from "../db/types";
import { BadRequest } from "../middleware/errorHandler";

function reloadCoins(newCoins: Coins) {
  Object.entries(coins).forEach(([coin, coinValue]) => {
    if (!newCoins.hasOwnProperty(coin))
      throw new BadRequest(`Change "${coin}" is not provideded`);

    Object.keys(coinValue).forEach((value) => {
      Object.values(newCoins).forEach((newCoin) => {
        if (!newCoin.hasOwnProperty(value))
          throw new BadRequest(
            `Coin "${value}" is not provideded in ${JSON.stringify(newCoin)}`
          );
      });
    });

    coins[coin as unknown as keyof Coins] =
      newCoins[coin as unknown as keyof Coins];
  });
}

function reloadProducts(newProducts: Product[]) {
  validateProductsSchema(newProducts);
  products.length = 0;
  products.push(...newProducts);
}

function handleOrder(product: Product, cash: number): Change {
  const changeToMap = calculateChange(cash, product!);

  updateProductStock(product!);

  return changeToMap;
}

const validateProductsSchema = (newProducts: Product[]) => {
  const productSchema = ["name", "price", "units", "maxUnits"];
  newProducts.forEach((obj) => {
    if (Object.keys(obj).length !== productSchema.length)
      throw new BadRequest(
        "Product should have 4 fieds: name, price, units and maxUnits"
      );
    Object.keys(obj).forEach((key) => {
      if (!productSchema.includes(key))
        throw new BadRequest(`Property "${key}" is not valid`);
    });
  });
};

const validateProduct = (name: string, cash: number, product?: Product) => {
  return product && product?.units > 0 ? true : false;
};

const validateCash = (cash: number, price: number) =>
  cash >= price ? true : false;

const calculateChange = (cash: number, product: Product) => {
  const changeToMap: Change = {
    1: 0,
    2: 0,
    5: 0,
    10: 0,
    20: 0,
    50: 0,
    100: 0,
    200: 0,
  };
  let changeDue = cash - product.price;
  let credit = cash - changeDue;

  if (credit > 0) {
    updateBalance(changeToMap, credit);
  }

  [200, 100, 50, 20, 10, 5, 2, 1].forEach((n) => {
    let num = Math.floor(changeDue / n);
    if (coins[n].units >= num) {
      changeDue = changeDue % n;
      changeToMap[n]! += num;
      coins[n].units -= num;
    }
  });

  const change: Change = {};

  for (const key in changeToMap) {
    if (changeToMap[key] !== 0) {
      let priceName = coins[key].name;
      change[priceName] = changeToMap[key];
    }
  }

  return change;
};

const updateBalance = (changeToMap: Change, credit: number) => {
  [200, 100, 50, 20, 10, 5, 2, 1].forEach((n) => {
    let num = Math.floor(credit / n);
    credit = credit % n;
    coins[n as keyof Coins].units += num;
  });
};

const updateProductStock = (product: Product) => product.units--;

const vendingMachineService = {
  handleOrder,
  validateProduct,
  validateCash,
  reloadCoins,
  reloadProducts,
};

export default vendingMachineService;
