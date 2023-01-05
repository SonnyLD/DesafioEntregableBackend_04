import fs from 'fs';


export default class ProductManager {
    constructor(title, description, price, thumbnail, stock, code, category, status = true) {
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
    let product = this.getProducts.find(product => product.id == id);
    if (!product){
        throw new Error ("El producto no existe");
    } 
    return product;
} 
   
alreadyExists(code) {
  let product = this.getProducts.find(product => product.code == code.trim().toUpperCase());
  return product ? true : false;
}

  #getMaxId() {
    let maxId = 0;
    this.getProducts.forEach((products) => {
      if (products.id > maxId) maxId = products.id
    });
    return maxId;
  }
  getProduct() {
    return this.getProducts;
  }
   
  updateProductById(id, updatedProduct) {
    const indexToUpdate = this.getProducts.findIndex(product => product.id == id);
    if (indexToUpdate === -1) {
        throw new Error ("Product not found");
    } else {
        this.getProducts[indexToUpdate] = {...updatedProduct, id: id};
        this.saveProductsFile();
    }
}
  
deleteProduct(id) {
  let product = this.getProducts.find(product => product.id == id);
  if (!product) {
      throw new Error ("Product not found");
  } else {
      this.getProducts.splice(this.getProducts.indexOf(product), 1);
      this.saveProductsFile();
  }
}

saveProductsFile() {
  fs.writeFileSync('getProducts.json', JSON.stringify(this.getProducts));
}

  
  }
 
