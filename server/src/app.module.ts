
import { HttpModule, HttpService, Module, OnModuleInit, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsAllFilter, LOGGER_HELPER_TOKEN } from './app/filter/exception.filter';
import { AppController } from './app/controller/app.controller';
import { NotificationController, SUPPORT_SERVICE_TOKEN } from './app/controller/notification.controller';
import { ProductController, PRODUCT_SERVICE_TOKEN } from './app/controller/product.controller';
import { CategoryController, CATEGORY_SERVICE_TOKEN } from './app/controller/category.controller';
import { NotificationService, EMAIL_SENDER_TOKEN } from './domain/service/notification.service';
import { ProductService, PRODUCT_REPOSITORY_TOKEN } from './domain/service/product.service';
import { CategoryService, CATEGORY_REPOSITORY_TOKEN } from './domain/service/category.service';
import { AuthService, AUTH_IMPL_TOKEN, USER_SERVICE_IMPL_TOKEN } from './domain/service/auth.service';
import { UserService, USER_REPOSITORY_TOKEN } from './domain/service/user.service';
import { UserController, USER_SERVICE_TOKEN } from './app/controller/user.controller';
import { AuthController, AUTH_SERVICE_TOKEN } from './app/controller/auth.controller';
import { EmailSmtpSenderAdapter } from './infra/email/email.sender.adapter';
import { AuthMiddleware } from './app/middleware/auth.middleware';
import { ProductSchema, 
  PRODUCT_COLLECTION_TOKEN } from './infra/database/schema/product.schema';
import { UserSchema, 
    USER_COLLECTION_TOKEN } from './infra/database/schema/user.schema';

import { AuthKeycloakImpl } from './infra/auth/auth-keycloak.impl';

import { CategorySchema, 
  CATEGORY_COLLECTION_TOKEN } from './infra/database/schema/category.schema';
import DB_CONNECTION from './infra/database/db.connection.string';
import {
  UserRepository
} from './infra/database/repository/user.repository';
import {
  CategoryRepository
} from './infra/database/repository/category.repository';
import {
  ProductRepository
} from './infra/database/repository/product.repository';
import LoggerHelper from './infra/logger/logger.helper';


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
    HttpModule,
    MongooseModule.forRoot(DB_CONNECTION),
    MongooseModule.forFeature([
      { name: PRODUCT_COLLECTION_TOKEN, schema: ProductSchema },
      { name: CATEGORY_COLLECTION_TOKEN, schema: CategorySchema },
      { name: USER_COLLECTION_TOKEN, schema: UserSchema },
    ])
  ],
  controllers: [AppController, AuthController, UserController, NotificationController, ProductController, CategoryController],
  providers: [
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: AuthService,
    },
    {
      provide: USER_SERVICE_IMPL_TOKEN,
      useClass: UserService,
    },
    {
      provide: USER_SERVICE_TOKEN,
      useClass: UserService,
    },
    {
      provide: SUPPORT_SERVICE_TOKEN,
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
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
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
      provide: AUTH_IMPL_TOKEN,
      useClass: AuthKeycloakImpl,
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


export class AppModule implements OnModuleInit {
  constructor(private readonly http: HttpService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .forRoutes(NotificationController);
  };

  onModuleInit() {
    this.http.axiosRef.interceptors.response.use(undefined, (error) => {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

      if (!expectedError) {
        return Promise.reject(error);
      }

      return error.response;
    });
  }
};
