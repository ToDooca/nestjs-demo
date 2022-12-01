import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsModule } from "./products/products.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      "mongodb+srv://du9000:Mx5E46E82?941@cluster0.0rs9ey4.mongodb.net/nestjs-demo?retryWrites=true&w=majority"
    ),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
