import fs from 'fs';


export default class ProductManager {
    constructor() {
        this.getProducts = [];
    }
    async addProducts(title, description, price, thumbnail, stock) {
      try{
       const products ={
        id: this.#getMaxId() + 1,
        title,
        description,
        price,
        thumbnail,
        code: [],
        stock,
    };
    this.getProducts.push(products);
    if(fs.existsSync('getProducts.json')){
      const getProducts = JSON.parse(await fs.promises.readFile('getProducts.json','utf8'));
      this.getProducts = getProducts;
      this.getProducts.push(products);
    } else{
      this.getProducts.push(products);
      fs.promises.writeFile('getProducts.json',JSON.stringify(this.getProducts))
    }
  
    }catch (error) {
      console.log(error);
      throw new Error(error);
    }
  } 
  getProductById(idProducto) { 
    const products = this.#getProducts(idProducto);
    if (products) {
      if (!products.includes(idProducto)) products.push(idProducto);
      console.log(this.getProducts);
    } else {  
       console.log("El producto existe");
    }
  }
  #getMaxId() {
    let maxId = 0;
    this.getProducts.map((products) => {
      if (products.id > maxId) maxId = products.id
    });
    return maxId;
  }
  #getProducts(idProducto) {
    return this.getProducts.find((products) => products.id === idProducto);
  }
   
  updateProduct(title, data) {
    for(let products of this.getProducts){
     if(products.title === title){
      products = Object.assign(products, data);
      fs.promises.writeFile('getProducts.json',JSON.stringify(this.getProducts));
      return products;
     }  
    } 
  }
  
  
  deleteProduct(id, data){
    for(let products of this.getProducts){
      if(products.id === id){
       products = Object.assign(products, data);
       fs.promises.writeFile('getProducts.json',JSON.stringify(this.getProducts));
       return products;
      }  
     } 
   }
  
  }
 