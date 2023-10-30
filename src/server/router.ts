import express from "express";
import { addItem, deleteItem, getShoppingList, updateItem } from "./controller";

const appRouter = express();

appRouter.get("/shopping-list", getShoppingList);
appRouter.post("/add-item", addItem);
appRouter.put("/update-item", updateItem);
appRouter.delete("/delete-item", deleteItem);

export default appRouter;
