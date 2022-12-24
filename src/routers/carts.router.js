import { Router } from "express";
import CartsManager from "../CartsManager.js"

export const cartsRouter = Router()

const cartsManager = new CartsManager();
cartsManager.addCarts("Producto 1 Mesa de comedor", "mesa de madera");
cartsManager.addCarts("Producto 2 Sofa de sala", "Producto de sala");
cartsManager.addCarts("Producto 3 silla", "silla de cocina");

cartsRouter.get('/:cid', (req, res) => {
    res.json(cartsManager.getCarts)
})

cartsRouter.post('/cid/product/:pid', (req, res) => {
    cartsManager.getCarts.push(req.body)
    res.status(201).json(cartsManager.getCarts);

})



