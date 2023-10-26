import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import shoppingList from "./data";

export const getShoppingList = (_req: Request, res: Response) => {
  res.send(shoppingList);
};

export const addItem = (req: Request, res: Response) => {
  console.log(req.body);
  const body = { ...req.body };
  if (!body.itemName) res.status(400).send({ message: "invalid Payload" });
  body._id = uuidv4();
  shoppingList.push(body);
  res.send({ message: "successfully added Item to list", body });
};
