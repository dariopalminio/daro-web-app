
import { HttpModule, HttpService, Module, OnModuleInit, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsAllFilter } from '../app/filter/exception.filter';
import { AppController } from '../app/controller/app.controller';
import { NotificationController } from '../app/controller/notification.controller';
import { ProductController } from '../app/controller/product.controller';
import { CategoryController } from '../app/controller/category.controller';
import { NotificationService } from '../domain/service/notification.service';
import { ProductService } from '../domain/service/product.service';
import { CategoryService } from '../domain/service/category.service';
import { AuthService } from '../domain/service/auth.service';
import { UserService } from '../domain/service/user.service';
import { UserController } from '../app/controller/user.controller';
import { AuthController } from '../app/controller/auth.controller';
import { EmailSmtpSenderAdapter } from '../infra/email/email-sender.adapter';
import { TranslatorNestjsI18nImpl } from '../infra/i18n/translator-nestjs-i18n-impl';
import { AuthMiddleware } from '../app/middleware/auth.middleware';
import { ProductSchema } from '../infra/database/schema/product.schema';
import { UserSchema } from '../infra/database/schema/user.schema';

import { AuthKeycloakImpl } from '../infra/auth/auth-keycloak.impl';

import { CategorySchema } from '../infra/database/schema/category.schema';
import DB_CONNECTION from '../infra/database/db.connection.string';
import {
  UserRepository
} from '../infra/database/repository/user.repository';
import {
  CategoryRepository
} from '../infra/database/repository/category.repository';
import {
  ProductRepository
} from '../infra/database/repository/product.repository';
import LoggerHelper from '../infra/logger/logger.helper';

import { IGlobalConfig } from '../domain/output-port/global-config.interface';
import { GlobalConfigImpl } from '../infra/config/global-config-impl';

//Mongo
import { MongooseModule } from '@nestjs/mongoose';
//i18n
import { I18nModuleConfig } from '../infra/i18n/i18n-module-config';

console.log(DB_CONNECTION);

//Dependency Injector
@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(DB_CONNECTION),
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Category', schema: CategorySchema },
      { name: 'User', schema: UserSchema },
    ]),
    I18nModuleConfig,
  ],
  controllers: [AppController, AuthController, UserController, NotificationController, ProductController, CategoryController],
  providers: [
    {
      provide: 'IGlobalConfig',
      useClass: GlobalConfigImpl,
    },
    {
      provide: 'ITranslator',
      useClass: TranslatorNestjsI18nImpl,
    },
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
    {
      provide: 'IUserService',
      useClass: UserService,
    },
    {
      provide: 'INotificationService',
      useClass: NotificationService,
    },
    {
      provide: 'IProductService',
      useClass: ProductService,
    },
    {
      provide: 'IEmailSender',
      useClass: EmailSmtpSenderAdapter,
    },
    {
      provide: 'ICategoryService',
      useClass: CategoryService,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'ICategoryRepository',
      useClass: CategoryRepository,
    },
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
    {
      provide: 'IAuth',
      useClass: AuthKeycloakImpl,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionsAllFilter,
    },
    {
      provide: 'ILoggerService',
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
