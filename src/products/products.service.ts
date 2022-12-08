import { Injectable, NotFoundException } from "@nestjs/common";
import { Product, ProductDTO } from "./product.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {

  }

  findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }
  insertProduct(product: ProductDTO): string {
    // prodId is random number just for demo purposes,
    // I would not use this in production!!!
    const newProduct = new this.productModel(product);
    newProduct.save().then(result => {
      return result.id as string;
    }).catch(err => {
      console.log(err);
    });
    return newProduct.id as string;
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

  updateProduct(product: Product) {
    const [newProduct, index] = this.findProduct(product.id);
    const updatedProduct = {...newProduct};
    if (product.title) {
      updatedProduct.title = product.title;
    }
    if (product.description) {
      updatedProduct.description = product.description;
    }
    if (product.price) {
      updatedProduct.price = product.price;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);
  }
}
