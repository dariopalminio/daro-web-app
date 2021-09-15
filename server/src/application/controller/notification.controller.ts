import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { INotificationService } from '../../domain/input/port/notification.service.interface';
import { ContactMessage } from '../../domain/model/contact.message';
import { StartConfirmEmailMessage } from '../../domain/model/start.confirm.email.message';

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

  @Post('sendStartEmailConfirm')
  sendStartEmailConfirm(@Body() startConfirmEmailData: StartConfirmEmailMessage): any {
    console.log(startConfirmEmailData);

    try {
      const sentInfo = this.supportService.sendStartEmailConfirm(startConfirmEmailData);
      return sentInfo;
    } catch (e) {
      return e.message;
    };
  }

}
