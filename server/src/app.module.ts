import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './view/controller/app.controller';
import { AppService } from './state/service/app.service';
import { NotificationController } from './view/controller/notification.controller';
import { NotificationService } from './state/service/notification.service';
import { AuthMiddleware } from './view/middleware/auth.middleware';

@Module({
  imports: [],
  controllers: [AppController, NotificationController],
  providers: [AppService, NotificationService],
})
export class AppModule {
configure(consumer: MiddlewareConsumer){
  consumer.apply(AuthMiddleware)
  .forRoutes(NotificationController);
}

}
