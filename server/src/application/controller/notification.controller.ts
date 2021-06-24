import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotificationService } from '../../domain/service/notification.service';
import { ContactDTO } from '../../domain/entity/notification/ContactDTO.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}


  @Post('sendContactEmail')
  sendContactEmail(@Body() body: ContactDTO): any {
    console.log(body);
    
    try{
      const sentInfo = this.notificationService.sendContactEmail(body);
      return sentInfo;
    }catch(e){
      return e.message;
    };
  }

}
