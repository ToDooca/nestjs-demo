import { BadGatewayException, Injectable, NotFoundException } from "@nestjs/common";
import { Product, ProductDTO } from "./product.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(@InjectModel("Product") private readonly productModel: Model<Product>) {

  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException("Could not find product.");
    }
    if (!product) {
      throw new NotFoundException("Could not find product.");
    }
    return product;
  }

  async insertProduct(product: ProductDTO): Promise<Product> {
    const newProduct = new this.productModel(product);
    try {
      return await newProduct.save();
    }
    catch (error) {
      throw new BadGatewayException("Could not insert product.");
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.productModel.find().exec();
    } catch (error) {
      throw new NotFoundException("Could not find products.");
    }
  }

  async getProduct(prodId: string): Promise<Product> {
    try {
      return await this.findProduct(prodId);
    } catch (error) {
      throw new NotFoundException("Could not find product.");
    }
  }

  async updateProduct(product: Product): Promise<Product> {
    const updatedProduct = new this.productModel(product);
    try {
      return await updatedProduct.save();
    } catch (error) {
      throw new BadGatewayException("Could not update product.");
    }
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);
  }
}
