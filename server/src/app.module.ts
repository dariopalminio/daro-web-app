import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController, APP_SERVICE } from './application/controller/app.controller';
import { AppService } from './domain/service/app.service';
import { NotificationController, NOTIFICATION_SERVICE } from './application/controller/notification.controller';
import { ProductController, PRODUCT_SERVICE } from './application/controller/product.controller';
import { NotificationService } from './domain/service/notification.service';
import { ProductService, PRODUCT_MODEL_NAME } from './domain/service/product.service';
import { AuthMiddleware } from './application/middleware/auth.middleware';
import { ProductSchema } from './infrastructure/database/schema/product.schema';
import DB_CONNECTION from './infrastructure/database/db.connection.string';

//Mongo
import { MongooseModule } from '@nestjs/mongoose';

console.log (DB_CONNECTION);

@Module({
  imports: [
    MongooseModule.forRoot(DB_CONNECTION),
    MongooseModule.forFeature([{ name: PRODUCT_MODEL_NAME, schema: ProductSchema }])
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
