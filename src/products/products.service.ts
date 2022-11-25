import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.entity";

@Injectable()
export class ProductsService {
  private products: Product[] = [];

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
    const product = this.products.find(prod => prod.id === prodId)
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return {...product};
  }
}
