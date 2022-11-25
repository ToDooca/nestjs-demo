import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(@Body() productBody: { title: string, description: string, price: number }): { id: string } {
    const generatedId = this.productsService.insertProduct(productBody.title, productBody.description, productBody.price);
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getProduct(prodId);
  }
}
