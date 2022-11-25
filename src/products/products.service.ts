import { Injectable } from "@nestjs/common";
import { Product } from "./product.entity";

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    // prodId is a current timestamp just for demo purposes,
    // I would not use this in production!!!
    const prodId = new Date().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }
}
