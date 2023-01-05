import { Router } from "express";

import ProductManager from "../ProductsManager.js";


export const productsRouter = Router();

export const productManager = new ProductManager();

productsRouter.get('/', (req, res) => {
    try {
      const { limit } = req.query;
      if (!limit) {
          const products = productManager.getProducts;
          res.status(200).json(products);
      } else {
          const productsQuery = productManager.getProducts.slice(0, limit);
          res.status(200).json(productsQuery);
      }
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
})


productsRouter.post('/', (req, res) => {
  try {
    productManager.getProducts.push(req.body);
    
    //emit de websocket en post
    const productsList = productManager.getProducts;
    req.io.emit('listChange', productsList);

    res.status(201).json(productManager.getProducts);
} catch (error) {
    res.status(501).json({ error: error.message });
}
});

productsRouter.get('/:pid', (req, res) => {
  try {
      const { pid } = req.params;
      const product = productManager.getProductById(pid);
      res.status(200).json(product);
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
}) 

productsRouter.put('/:pid',(req, res) => {
  try {
    
      const { pid } = req.params;
      const { title, description, price, thumbnail, stock, code, category, status } = req.body;
      const products = new ProductManager(title, description, price, thumbnail, stock, code, category, status);
      
      productManager.updateProductById(Number(pid), products);
    console.log(req);

    const productsList = productManager.getProducts;
        req.io.emit('listChange', productsList);

    res.status(200).json(products);
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
});

productsRouter.delete('/:pid', (req, res) => {
  try {
    const { pid } = req.params;
    productManager.deleteProduct(pid);

 const productsList = productManager.getProducts;
        req.io.emit('listChange', productsList);

        res.status(200).json({ message: 'Producto borrado' });
      } catch (error) {
          res.status(501).json({ error: error.message });
      }
});