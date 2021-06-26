import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController, APP_SERVICE } from './application/controller/app.controller';
import { AppService } from './domain/service/app.service';
import { NotificationController, NOTIFICATION_SERVICE } from './application/controller/notification.controller';
import { ProductController, PRODUCT_SERVICE } from './application/controller/product.controller';
import { NotificationService } from './domain/service/notification.service';
import { ProductService } from './domain/service/product.service';
import { AuthMiddleware } from './application/middleware/auth.middleware';
import { ProductSchema, Product } from './infrastructure/database/schema/product.schema';
import { DB_CONNECTION } from './infrastructure/database/db.connection.string';

//Mongo
import { MongooseModule } from '@nestjs/mongoose';

/**
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://daro:<password>@clusterdaro.zjmdi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

mongodb+srv://daro:<password>@clusterdaro.zjmdi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
 */

console.log (DB_CONNECTION);

@Module({
  imports: [
    MongooseModule.forRoot(DB_CONNECTION),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])
    ],
  controllers: [AppController, NotificationController, ProductController],
  providers: [
    {
      provide: APP_SERVICE,
      useClass: AppService,
    }, 
    {
      provide: NOTIFICATION_SERVICE,
      useClass: NotificationService,
    },
    {
      provide: PRODUCT_SERVICE,
      useClass: ProductService,
    }
  ],
})
export class AppModule {
configure(consumer: MiddlewareConsumer){
  consumer.apply(AuthMiddleware)
  .forRoutes(NotificationController);
}

}
