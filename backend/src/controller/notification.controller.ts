import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotificationService } from '../service/notification.service';
import { ContactDTO } from '../model/dto/ContactDTO.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}


  @Post('sendContactEmail')
  sendContactEmail(@Body() body: ContactDTO): string {
    console.log(body);
    

    try{
      const r = this.notificationService.sendContactEmail(body);
      return "OK!!!!!!";
    }catch(e){
      return "Bad";
    };
  }

}
