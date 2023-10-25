import express from "express";
import { addItem, getShoppingList } from "./controller";


const appRouter = express.Router()

appRouter.get('/shopping-list', getShoppingList);
appRouter.post('/add-item', addItem);

export default appRouter;