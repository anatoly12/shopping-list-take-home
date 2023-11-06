import { Request, Response } from "express";
import ShoppingList from "./model";

export const getShoppingList = async (_req: Request, res: Response) => {
  try {
    const data = await ShoppingList.find();
    res.send(data);
  } catch (err) {
    res.send(400).send(err);
  }
};

export const addItem = async (req: Request, res: Response) => {
  try {
    const body = { ...req.body };
    if (!body.itemName) res.status(400).send({ message: "invalid Payload" });
    const data = await ShoppingList.create(body);
    res.send({ message: "successfully added Item to list", data });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const body = { ...req.body };
    const data = await ShoppingList.findByIdAndUpdate(body._id, body, {
      new: true,
    });
    if (data) {
      res.send({ message: "successfully updated item", data });
    } else {
      res.status(404).send({ message: `item ${body._id} does not exists` });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    const response = await ShoppingList.findByIdAndDelete(id, {
      new: true,
    });
    if (response) {
      res.send({ message: "successfully deleted item", response });
    } else {
      res.send({ message: "could not delete item" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
