import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController, APP_SERVICE } from './application/controller/app.controller';
import { AppService } from './domain/service/app.service';
import { NotificationController, NOTIFICATION_SERVICE } from './application/controller/notification.controller';
import { NotificationService } from './domain/service/notification.service';
import { AuthMiddleware } from './application/middleware/auth.middleware';


@Module({
  imports: [],
  controllers: [AppController, NotificationController],
  providers: [
    {
      provide: APP_SERVICE,
      useClass: AppService,
    }, 
    {
      provide: NOTIFICATION_SERVICE,
      useClass: NotificationService,
    }
  ],
})
export class AppModule {
configure(consumer: MiddlewareConsumer){
  consumer.apply(AuthMiddleware)
  .forRoutes(NotificationController);
}

}
