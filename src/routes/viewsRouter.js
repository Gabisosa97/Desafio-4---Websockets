import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const viewsRouter = new Router();
const pm = new ProductManager();

viewsRouter.get("/", async (req, res) => {
  const products = await pm.getProducts();

  res.render("index", { products });
});

viewsRouter.get("/RTP", async (req, res) => {
  const products = await pm.getProducts();

  res.render("realtimeproducts", { products });
});

export default viewsRouter;
