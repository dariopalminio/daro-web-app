import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { INotificationService } from '../../domain/service/interface/notification.service.interface';
import { ContactMessage } from '../../domain/model/contact.message';



export const SUPPORT_SERVICE_TOKEN = 'SupportService_Implementation';

@Controller('notification')
export class NotificationController {

  constructor(
    @Inject(SUPPORT_SERVICE_TOKEN)
    private readonly supportService: INotificationService
  ) { }


  @Get()
  getHello(): string {
    return "Hello World!";
  }

  @Post('sendContactEmail')
  sendContactEmail(@Body() contactMessage: ContactMessage): any {
    console.log(contactMessage);

    try {
      const sentInfo = this.supportService.sendContactEmail(contactMessage);
      return sentInfo;
    } catch (e) {
      return e.message;
    };
  }


}
