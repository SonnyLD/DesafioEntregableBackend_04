import { Router } from "express";

import ProductManager from "../ProductsManager.js";


export const productsRouter = Router();

export const productManager = new ProductManager();
productManager.addProducts("Producto 1 Mesa de comedor", "mesa de madera", 1400, "Sin imagen", 60);
productManager.addProducts("Producto 2 Sofa de sala", "Producto de sala", 1000, "Sin imagen", 100);
productManager.addProducts("Producto 3 silla", "silla de cocina", 230, "Sin imagen", 200);

productsRouter.get('/', (req, res) => {
    res.json(productManager.getProducts)
})

productsRouter.post('/', (req, res) => {
    productManager.getProducts.push(req.body) 
    res.status(201).json(productManager.getProducts);

})

productsRouter.put('/:title',(req, res) => {
  try {
    const { title } = req.params;
    const { body } = req;
    const newProduct = productManager.updateProduct(title, body);
    console.log(newProduct);
    res.json(newProduct);
  } catch (error) {
    res.status(400).send(error);
  }
});

productsRouter.delete('/:id', (req, res) => {
  let products = productManager.deleteProduct(item => item.id === req.query.id);
 productManager.deleteProduct(products, 1);
 res.sendStatus(200);
});

