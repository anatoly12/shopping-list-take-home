import express from "express";
import ViteExpress from "vite-express";
import appRouter from "./router";

const app = express();
const router = express.Router()

router.use(appRouter)

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
