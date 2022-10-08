export type Product = {
  name: string;
  price: number;
  units: number;
  maxUnits: number;
};

export interface Money {
  1: "1p";
  2: "2p";
  5: "5p";
  10: "10p";
  20: "20p";
  50: "50p";
  100: "1£";
  200: "2£";
}

export type Change = {
  [key in keyof Money]?: number;
};

export type Coins = {
  [key in keyof Money]: Coin;
};

type Coin = {
  name: string;
  price: number;
  units: number;
  maxUnits: number;
};
