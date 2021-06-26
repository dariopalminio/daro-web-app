import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { INotificationService } from '../../domain/input/port/INotificationService';
import { ContactMessage } from '../../domain/model/value_object/ContactMessage';

export const NOTIFICATION_SERVICE = 'NotificationService';

@Controller('notification')
export class NotificationController {
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService
    ) {}


  @Post('sendContactEmail')
  sendContactEmail(@Body() contactMessage: ContactMessage): any {
    console.log(contactMessage);
    
    try{
      const sentInfo = this.notificationService.sendContactEmail(contactMessage);
      return sentInfo;
    }catch(e){
      return e.message;
    };
  }

}
