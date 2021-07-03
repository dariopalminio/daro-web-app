import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './application/controller/app.controller';
import { NotificationController, NOTIFICATION_SERVICE_TOKEN } from './application/controller/notification.controller';
import { ProductController, PRODUCT_SERVICE_TOKEN } from './application/controller/product.controller';
import { CategoryController, CATEGORY_SERVICE_TOKEN } from './application/controller/category.controller';
import { NotificationService, EMAIL_SENDER_TOKEN } from './domain/service/notification.service';
import { ProductService, PRODUCT_REPOSITORY_TOKEN } from './domain/service/product.service';
import { CategoryService, CATEGORY_REPOSITORY_TOKEN } from './domain/service/category.service';
import { EmailSmtpSenderAdapter } from './infrastructure/notification/email.sender.adapter';
import { AuthMiddleware } from './application/middleware/auth.middleware';
import { ProductSchema } from './infrastructure/database/schema/product.schema';
import { CategorySchema } from './infrastructure/database/schema/category.schema';
import DB_CONNECTION from './infrastructure/database/db.connection.string';
import {
  CategoryRepository,
  CATEGORY_COLLECTION_TOKEN
} from './infrastructure/database/repository/category.repository';
import {
  ProductRepository,
  PRODUCT_COLLECTION_TOKEN
} from './infrastructure/database/repository/product.repository';


//Mongo
import { MongooseModule } from '@nestjs/mongoose';

console.log(DB_CONNECTION);

/**
 * 
 
export default () => ({
  mongoConnection: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_USERPASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  test: process.env.TEST,
  redirectUri: process.env.REDIRECT_URI,
});



MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongoConnection'),
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }),
      inject: [ConfigService],
    })
 */

//Dependency Injector
@Module({
  imports: [
    MongooseModule.forRoot(DB_CONNECTION),
    MongooseModule.forFeature([
      { name: PRODUCT_COLLECTION_TOKEN, schema: ProductSchema },
      { name: CATEGORY_COLLECTION_TOKEN, schema: CategorySchema },
    ])
  ],
  controllers: [AppController, NotificationController, ProductController, CategoryController],
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
    },
    {
      provide: CATEGORY_SERVICE_TOKEN,
      useClass: CategoryService,
    },
    {
      provide: CATEGORY_REPOSITORY_TOKEN,
      useClass: CategoryRepository,
    },
    {
      provide: PRODUCT_REPOSITORY_TOKEN,
      useClass: ProductRepository,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .forRoutes(NotificationController);
  };

};
