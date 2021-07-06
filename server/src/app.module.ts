import { Module, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsAllFilter, LOGGER_HELPER_TOKEN } from './application/filter/exception.filter';
import { AppController } from './application/controller/app.controller';
import { SupportController, SUPPORT_SERVICE_TOKEN } from './application/controller/support.controller';
import { ProductController, PRODUCT_SERVICE_TOKEN } from './application/controller/product.controller';
import { CategoryController, CATEGORY_SERVICE_TOKEN } from './application/controller/category.controller';
import { SupportService, EMAIL_SENDER_TOKEN } from './domain/service/support.service';
import { ProductService, PRODUCT_REPOSITORY_TOKEN } from './domain/service/product.service';
import { CategoryService, CATEGORY_REPOSITORY_TOKEN } from './domain/service/category.service';
import { EmailSmtpSenderAdapter } from './infrastructure/notification/email.sender.adapter';
import { AuthMiddleware } from './application/middleware/auth.middleware';
import { ProductSchema, 
  PRODUCT_COLLECTION_TOKEN } from './infrastructure/database/schema/product.schema';
import { CategorySchema, 
  CATEGORY_COLLECTION_TOKEN } from './infrastructure/database/schema/category.schema';
import DB_CONNECTION from './infrastructure/database/db.connection.string';
import {
  CategoryRepository
} from './infrastructure/database/repository/category.repository';
import {
  ProductRepository
} from './infrastructure/database/repository/product.repository';
import LoggerHelper from './infrastructure/logger/logger.helper';

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
  controllers: [AppController, SupportController, ProductController, CategoryController],
  providers: [
    {
      provide: SUPPORT_SERVICE_TOKEN,
      useClass: SupportService,
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
    {
      provide: APP_FILTER,
      useClass: ExceptionsAllFilter,
    },
    {
      provide: LOGGER_HELPER_TOKEN,
      useClass: LoggerHelper,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .forRoutes(SupportController);
  };

};
