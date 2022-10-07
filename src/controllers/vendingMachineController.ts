import { Request, Response } from "express";

const getVendingMachine = async (req: Request, res: Response) => {
  res.send("Hi");
};

export { getVendingMachine };
