import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
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

  @Patch(':id')
  updateProduct(@Param('id') prodId: string, @Body() productBody: { title: string, description: string, price: number }) {
    this.productsService.updateProduct(prodId, productBody.title, productBody.description, productBody.price);
    return null;
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    this.productsService.deleteProduct(prodId);
    return null;
  }
}
