import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import shoppingList from "./data";

export const getShoppingList = (_req: Request, res: Response) => {
  res.send(shoppingList);
};

export const addItem = (req: Request, res: Response) => {
  const body = { ...req.body };
  if (!body.itemName) res.status(400).send({ message: "invalid Payload" });
  body._id = uuidv4();
  shoppingList.push(body);
  res.send({ message: "successfully added Item to list", body });
};

export const updateItem = (req: Request, res: Response) => {
  const body = { ...req.body };
  const index = shoppingList.findIndex((d) => d._id === body._id);
  if (index !== -1) {
    shoppingList.splice(index, 1, body);
    res.send({ message: "successfully updated item" });
  } else {
    res.status(404).send({ message: `item ${body._id} does not exists` });
  }
};

export const deleteItem = (req: Request, res: Response) => {
  const id = req.query.id;
  const index = shoppingList.findIndex((d) => d._id === id);
  if (id) {
    shoppingList.splice(index, 1);
    res.send({ message: "successfully deleted item" });
  } else {
    res.send({ message: "could not delete item" });
  }
};
