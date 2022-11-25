import { Controller, Post, Body } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Post()
  addProduct(@Body() productBody: { title: string, description: string, price: number }): any {
    const generatedId = this.productsService.insertProduct(productBody.title, productBody.description, productBody.price);
    return { id: generatedId };
  }
}
