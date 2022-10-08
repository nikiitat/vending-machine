import { products, coins } from "../db/data";
import { Product, Change, Coins, Money } from "../db/types";

function handleOrder(product: Product, cash: number): Change {
  const change = calculateChange(cash, product!);

  updateProductStock(product!);

  return change;
}

const validateProduct = (name: string, cash: number, product?: Product) => {
  return product && product?.units > 0 ? true : false;
};

const validateCash = (cash: number, price: number) =>
  cash >= price ? true : false;

const calculateChange = (cash: number, product: Product) => {
  const change: Change = {
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

  [200, 100, 50, 20, 10, 5, 2, 1].forEach((n) => {
    let num = Math.floor(changeDue / n);
    changeDue = changeDue % n;
    change[n as keyof Change]! += num;
  });

  updateBalance(change, credit);

  const returnChange: Change = {};

  for (const key in change) {
    if (change[key as unknown as keyof Change] !== 0) {
      let priceName = coins[key as unknown as keyof Change].name;
      returnChange[priceName as unknown as keyof Change] = change[key as unknown as keyof Change];
    }
  }

  return returnChange;
};

const updateBalance = (change: Change, credit: number) => {
  [200, 100, 50, 20, 10, 5, 2, 1].forEach((n) => {
    let num = Math.floor(credit / n);
    credit = credit % n;
    coins[n as keyof Coins].units += num;
  });

  Object.entries(change).forEach(([k, v]) => {
    coins[k as unknown as keyof Change].units -= v;
  });
};

const updateProductStock = (product: Product) => product.units--;

const vendingMachineService = {
  handleOrder,
  validateProduct,
  validateCash,
};

export default vendingMachineService;