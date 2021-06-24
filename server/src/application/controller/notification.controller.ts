import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { INotificationService } from '../../domain/service/interface/INotificationService';
import { ContactMessage } from '../../domain/model/valueo_bject/ContactMessage';

export const NOTIFICATION_SERVICE = 'NotificationService';

@Controller('notification')
export class NotificationController {
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService
    ) {}


  @Post('sendContactEmail')
  sendContactEmail(@Body() body: ContactMessage): any {
    console.log(body);
    
    try{
      const sentInfo = this.notificationService.sendContactEmail(body);
      return sentInfo;
    }catch(e){
      return e.message;
    };
  }

}
