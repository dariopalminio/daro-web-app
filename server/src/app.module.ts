import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController, APP_SERVICE_INJECTED } from './application/controller/app.controller';
import { AppService } from './domain/service/app.service';
import { NotificationController, NOTIFICATION_SERVICE_INJECTED } from './application/controller/notification.controller';
import { ProductController, PRODUCT_SERVICE_INJECTED } from './application/controller/product.controller';
import { NotificationService, EMAIL_SENDER_INJECTED } from './domain/service/notification.service';
import { ProductService, PRODUCT_MODEL_INJECTED } from './domain/service/product.service';
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
    MongooseModule.forFeature([{ name: PRODUCT_MODEL_INJECTED, schema: ProductSchema }])
  ],
  controllers: [AppController, NotificationController, ProductController],
  providers: [
    {
      provide: APP_SERVICE_INJECTED,
      useClass: AppService,
    },
    {
      provide: NOTIFICATION_SERVICE_INJECTED,
      useClass: NotificationService,
    },
    {
      provide: PRODUCT_SERVICE_INJECTED,
      useClass: ProductService,
    },
    {
      provide: EMAIL_SENDER_INJECTED,
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
