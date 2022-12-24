import fs from 'fs';

 class CartsManager {
    constructor() {
        this.getCarts = [];
    }
    async addCarts(title) {
      try{
       const carts ={
        id: this.#getMaxId() + 1,
        title,
        
    };
    this.getCarts.push(carts);
    if(fs.existsSync('getCarts.json')){
      const getCarts = JSON.parse(await fs.promises.readFile('getCarts.json','utf8'));
      this.getCarts = getCarts;
      this.getCarts.push(carts);
    } else{
      this.getCarts.push(carts);
      fs.promises.writeFile('getCarts.json',JSON.stringify(this.getCarts))
    }
  
    }catch (error) {
      console.log(error);
      throw new Error(error);
    }
  } 
  getProductById(idProducto) { 
    const carts = this.#getCarts(idProducto);
    if (carts) {
      if (!carts.includes(idProducto)) carts.push(idProducto);
      console.log(this.getCarts);
    } else {  
       console.log("El producto existe");
    }
  }
  #getMaxId() {
    let maxId = 0;
    this.getCarts.map((carts) => {
      if (carts.id > maxId) maxId = carts.id
    });
    
    return maxId;
    
  }
  #getCarts(idProducto) {
    return this.getCarts.find((carts) => carts.id === idProducto);
  }
   
  }
  export default CartsManager;