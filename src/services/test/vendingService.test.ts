import { coins, products } from "../../db/data";
import { Coins } from "../../db/types";
import { BadRequest } from "../../middleware/errorHandler";
import vendingMachineService from "../vendingService";

describe("vendingMachineService tests", () => {
  test("verify products can be reloaded", () => {
    vendingMachineService.reloadProducts([
      {
        name: "Coca Cola",
        price: 320,
        units: 12,
        maxUnits: 20,
      },
    ]);

    expect(products).toStrictEqual([
      {
        name: "Coca Cola",
        price: 320,
        units: 12,
        maxUnits: 20,
      },
    ]);
  });

  test("verify coins can be reloaded", () => {
    const newCoins = {
      "1": {
        name: "1p",
        price: 1,
        units: 3,
        maxUnits: 50,
      },
      "2": {
        name: "2p",
        price: 2,
        units: 3,
        maxUnits: 50,
      },
      "5": {
        name: "5p",
        price: 5,
        units: 3,
        maxUnits: 50,
      },
      "10": {
        name: "10p",
        price: 10,
        units: 3,
        maxUnits: 50,
      },
      "20": {
        name: "20p",
        price: 20,
        units: 3,
        maxUnits: 50,
      },
      "50": {
        name: "50p",
        price: 50,
        units: 3,
        maxUnits: 50,
      },
      "100": {
        name: "1£",
        price: 100,
        units: 3,
        maxUnits: 50,
      },
      "200": {
        name: "2£",
        price: 200,
        units: 3,
        maxUnits: 50,
      },
    };

    vendingMachineService.reloadCoins(newCoins);

    expect(coins).toStrictEqual(newCoins);
  });

  test("verify coins NOT reloaded", () => {
    const newCoins = {
      "2": {
        name: "2p",
        price: 2,
        units: 3,
        maxUnits: 50,
      },
      "5": {
        name: "5p",
        price: 5,
        units: 3,
        maxUnits: 50,
      },
      "10": {
        name: "10p",
        price: 10,
        units: 3,
        maxUnits: 50,
      },
      "20": {
        name: "20p",
        price: 20,
        units: 3,
        maxUnits: 50,
      },
      "50": {
        name: "50p",
        price: 50,
        units: 3,
        maxUnits: 50,
      },
      "100": {
        name: "1£",
        price: 100,
        units: 3,
        maxUnits: 50,
      },
      "200": {
        name: "2£",
        price: 200,
        units: 3,
        maxUnits: 50,
      },
    };

    try {
      vendingMachineService.reloadCoins(newCoins as Coins);
    } catch (error) {
      expect(error).toStrictEqual(new BadRequest("Property is not provideded"));
    }
  });

  test("verify product can be bought", () => {
    const change = vendingMachineService.handleOrder(products[0], 350);

    expect(change).toStrictEqual({ "10p": 1, "20p": 1 });
    expect(products[0]).toStrictEqual({
      name: "Coca Cola",
      price: 320,
      units: 11,
      maxUnits: 20,
    });
  });
});
