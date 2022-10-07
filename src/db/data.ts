export type Product = {
  name: string;
  price: number;
  units: number;
  maxUnits: number;
};

export enum Money {
  "1p" = 1,
  "2p" = 2,
  "5p" = 5,
  "10p" = 10,
  "20p" = 20,
  "50p" = 50,
  "1£" = 100,
  "2£" = 200,
}

export type Change = {
  [key in Money]?: number;
};

export type Coins = {
  [key in Money]: Coin;
};

type Coin = {
  name: string;
  price: number;
  units: number;
  maxUnits: number;
};

export const data: Product[] = [
  {
    name: "Coca Cola",
    price: 320,
    units: 12,
    maxUnits: 20,
  },
  {
    name: "Snickers",
    price: 410,
    units: 12,
    maxUnits: 20,
  },
];

export const coins: Coins = {
  1: {
    name: "1p",
    price: 1,
    units: 41,
    maxUnits: 50,
  },
  2: {
    name: "2p",
    price: 2,
    units: 33,
    maxUnits: 50,
  },
  5: {
    name: "5p",
    price: 5,
    units: 27,
    maxUnits: 50,
  },
  10: {
    name: "10p",
    price: 10,
    units: 41,
    maxUnits: 50,
  },
  20: {
    name: "20p",
    price: 20,
    units: 33,
    maxUnits: 50,
  },
  50: {
    name: "50p",
    price: 50,
    units: 27,
    maxUnits: 50,
  },
  100: {
    name: "1£",
    price: 100,
    units: 41,
    maxUnits: 50,
  },
  200: {
    name: "2£",
    price: 200,
    units: 33,
    maxUnits: 50,
  },
};
