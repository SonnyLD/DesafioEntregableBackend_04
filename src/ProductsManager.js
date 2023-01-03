import fs from 'fs';


export default class ProductManager {
    constructor() {
        this.getProducts = [];
    }
    async addProducts(title, description, price, thumbnail, stock, code, category, status = true) {
      try{
       const products ={
        id: this.#getMaxId() + 1,
        title,
        description,
        price,
        thumbnail,
        stock,
        code,
        category,
        status,
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
  getProductById(id) { 
    if (isNaN(id)) {
      throw new Error('id is not valid, must be a number');
    }
    let product = this.#getProducts.find(product => product.id == id);
    if (!product){
        throw new Error ("El producto no existe");
    } 
    return product;
}
   
  #getMaxId() {
    let maxId = 0;
    this.getProducts.forEach((products) => {
      if (products.id > maxId) maxId = products.id
    });
    return maxId;
  }
  #getProducts() {
    return this.getProducts;
  }
   
  updateProduct(id) {
    for(let products of this.getProducts){
     if(products.id === id){
      products = Object.assign(products);
      fs.promises.writeFile('getProducts.json',JSON.stringify(this.getProducts));
      return products;
     }  
    } 
  }
  
  
  deleteProduct(id){
    for(let products of this.getProducts){
      if(products.id === id){
       products = Object.assign(products);
       fs.promises.writeFile('getProducts.json',JSON.stringify(this.getProducts));
       return products;
      }  
     } 
   }
  
  }
 