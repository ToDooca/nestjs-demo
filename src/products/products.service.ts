import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.entity";

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }

  insertProduct(title: string, desc: string, price: number) {
    // prodId is random number just for demo purposes,
    // I would not use this in production!!!
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getAllProducts() {
    return [...this.products];
  }

  getProduct(prodId: string) {
    const product = this.findProduct(prodId)[0];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return {...product};
  }

  updateProduct(prodId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(prodId);
    const updatedProduct = {...product};
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);
  }
}
