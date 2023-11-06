import express from "express";
import ViteExpress from "vite-express";
import appRouter from "./router";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

mongoose.connect(`${process.env.MONGO_DB_URI}/shoppingList`).then(() => {
  console.log("mongo connected successfully");
});

app.use(express.json());
app.use(appRouter);

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
