import { Router } from 'express';
import ProductManager from "../controllers/productManager.js"

const productManager = new ProductManager();
const ProductRouter = Router();


//GET PRODUCT POR LIMIT.
ProductRouter.get("/", async (req, res) => {
  const limit = +req.query.limit;
  try {
    const products = await productManager.getProducts();
    if (limit) {
      const productLimit = products.slice(0, limit);
      console.log(productLimit);
      res.send(productLimit);
    } else {
      console.log(products);
      res.send(products);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//GET PRODUCT POR ID.
ProductRouter.get("/:pid", async (req, res) => {
  const pid = +req.params.pid;
  try {
    const product = await productManager.getProductsById(pid);
    console.log(product);
    res.send(product);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//POST AGREGAR UN NUEVO PRODUCTO.
ProductRouter.post("/", async (req, res) => {
  let product = req.body;
  const products = await productManager.getProducts();

  if (
    !product.title ||
    !product.description ||
    !product.code ||
    !product.price ||
    !product.status ||
    !product.stock ||
    !product.category ||
    !product.thumbnail
  ) {
    return res
      .status(400)
      .send({ status: "error", error: "Valores incompletos." });
  }

  products.push(await productManager.addProduct(product));

  res.status(201).send({ status: "success", message: "Product created" });
});

//PUT ACTUALIZAR UN PRODUCTO.

ProductRouter.put("/:pid", async (req, res) => {
  let product = req.body;
  let pid = req.params.pid;

  if (
    !product.title ||
    !product.description ||
    !product.code ||
    !product.price ||
    !product.status ||
    !product.stock ||
    !product.category ||
    !product.thumbnail
  ) {
    return res
      .status(400)
      .send({ status: "error", error: "Valores incompletos." });
  }

  await productManager.updateProduct(Number(pid), product);
  res.status(200).send({ status: "success", message: "Product modified" });
});

//DELETE ELIMINAR UN PRODUCTO.

ProductRouter.delete("/:pid", async (req, res) => {
  try {
    const pid = +req.params.pid;
    const deleteProductById = await productManager.deleteProduct(Number(pid));
    res.send(deleteProductById);
  } catch (error) {
    res.status(404).send(error);
  }
});

export default ProductRouter;





