import { Request, Response } from "express";
import shoppingList from "./data";

export const getShoppingList = (_req: Request, res: Response) => {
    res.send(shoppingList)
};

export const addItem = (req: Request, res: Response) => {
    const body = {...req.body}
    shoppingList.push(body);
    res.send({message: 'successfully added Item to list'})
}
