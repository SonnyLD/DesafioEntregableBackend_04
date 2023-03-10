import { Router } from "express";
import ProductManager from "../ProductsManager.js";
import Product from "../Products.js";

export const productsRouter = Router();

export const productManager = new ProductManager();


productsRouter.get('/', (req, res) => {
    try {
      const { limit } = req.query;
      if (!limit) {
          const products = productManager.getProduct();
          res.status(200).json(products);
      } else {
          const productsQuery = productManager.getProduct.slice(0, limit);
          res.status(200).json(productsQuery);
      }
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
})


productsRouter.post('/', (req, res) => {
  try {
      const { title, description, price, thumbnail, stock, code, category, status } = req.body;
      const products = new Product(title, description, price, thumbnail, stock, code, category, status);
      productManager.addProduct(products);
    //emit de websocket en post
    const productsList = productManager.getProduct();
    req.io.emit('listChange', productsList);

    res.status(201).json(products);
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
      const products = new Product(title, description, price, thumbnail, stock, code, category, status);
      
      productManager.updateProductById(Number(pid), products);
    console.log(req);

    const productsList = productManager.getProduct();
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

 const productsList = productManager.getProduct();
        req.io.emit('listChange', productsList);

        res.status(200).json({ message: 'Producto borrado' });
      } catch (error) {
          res.status(501).json({ error: error.message });
      }
});