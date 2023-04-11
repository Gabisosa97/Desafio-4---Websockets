import { Router } from 'express';
import CartManager from "../controllers/cartManager.js";
import ProductManager from "../controllers/productManager.js";

const CartRouter = Router ();

const cartManager = new CartManager();
const productManager = new ProductManager();

CartRouter.post("/", async (req, res) => {
    try {
        const products = req.body;
        const newCart = await cartManager.addCart(products);
        res.send(newCart);
    }catch (error) {
        res.status(500).send(error);
    }
})

CartRouter.get('/:cid', async (req, res) => {
    try{
        const idCart = +req.params.cid;
        const productsInCart = await cartManager.getProductListByCartId(idCart);
        res.send(productsInCart);
    }catch (error){
        res.status(500).send(error);
    }
})

CartRouter.get('/', async (req, res) => {
    try{
        const arrayCarts = await cartManager.getCarts();
        res.send(arrayCarts);
    }catch (error){
        res.status(500).send(error);
    }
})

CartRouter.post('/:cid/product/:pid', async (req, res) => {
    try{
    const idCart = +req.params.cid;
    const idProduct = +req.params.pid;

    const { id } = await productManager.getProductsById(idProduct);
    const addProductToCart = await cartManager.addProductToCart(idCart, id);
    res.send(addProductToCart);
    }catch (error) {
        res.status(500).send(error)
    }
})

export default CartRouter;