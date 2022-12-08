import { Controller, Post, Body, Get, Param, Delete, Put } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product, ProductDTO } from "./product.entity";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(@Body() productBody: ProductDTO): Promise<ProductDTO> {
    return this.productsService.insertProduct(productBody);
  }

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getProduct(prodId);
  }

  @Put()
  updateProduct(@Body() productBody: Product): Promise<Product> {
    return this.productsService.updateProduct(productBody);
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    this.productsService.deleteProduct(prodId);
    return null;
  }
}
