import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsModule } from "./products/products.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({
      envFilePath: ".env.local",
    }),
    MongooseModule.forRoot(
      "mongodb+srv://"+process.env.DATABASE_USER+":" + encodeURIComponent(process.env.DATABASE_PASSWORD) + "@cluster0.0rs9ey4.mongodb.net/nestjs-demo?retryWrites=true&w=majority"
    )
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
