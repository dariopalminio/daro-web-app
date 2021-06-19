import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { NotificationController } from './controller/notification.controller';
import { NotificationService } from './service/notification.service';
import { AuthMiddlewareService } from './service/auth.middleware.service';

@Module({
  imports: [],
  controllers: [AppController, NotificationController],
  providers: [AppService, NotificationService],
})
export class AppModule {
configure(consumer: MiddlewareConsumer){
  consumer.apply(AuthMiddlewareService)
  .forRoutes(AppController, NotificationController);
}

}
