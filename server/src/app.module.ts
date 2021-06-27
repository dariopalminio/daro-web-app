import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './application/controller/app.controller';
import { NotificationController, NOTIFICATION_SERVICE_TOKEN } from './application/controller/notification.controller';
import { ProductController, PRODUCT_SERVICE_TOKEN } from './application/controller/product.controller';
import { NotificationService, EMAIL_SENDER_TOKEN } from './domain/service/notification.service';
import { ProductService, PRODUCT_MODEL_TOKEN } from './domain/service/product.service';
import { EmailSmtpSenderAdapter } from './infrastructure/notification/EmailSmtpSenderAdapter';
import { AuthMiddleware } from './application/middleware/auth.middleware';
import { ProductSchema } from './infrastructure/database/schema/product.schema';
import DB_CONNECTION from './infrastructure/database/db.connection.string';

//Mongo
import { MongooseModule } from '@nestjs/mongoose';

console.log(DB_CONNECTION);

//Dependency Injector
@Module({
  imports: [
    MongooseModule.forRoot(DB_CONNECTION),
    MongooseModule.forFeature([{ name: PRODUCT_MODEL_TOKEN, schema: ProductSchema }])
  ],
  controllers: [AppController, NotificationController, ProductController],
  providers: [
    {
      provide: NOTIFICATION_SERVICE_TOKEN,
      useClass: NotificationService,
    },
    {
      provide: PRODUCT_SERVICE_TOKEN,
      useClass: ProductService,
    },
    {
      provide: EMAIL_SENDER_TOKEN,
      useClass: EmailSmtpSenderAdapter,
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .forRoutes(NotificationController);
  };

};
