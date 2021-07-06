import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ISupportService } from '../../domain/input/port/support.service.interface';
import { ContactMessage } from '../../domain/model/contact.message';

export const SUPPORT_SERVICE_TOKEN = 'SupportService_Implementation';

@Controller('support')
export class SupportController {

  constructor(
    @Inject(SUPPORT_SERVICE_TOKEN)
    private readonly supportService: ISupportService
  ) { }


  @Get()
  getHello(): string {
    return "Hello World!";
  }

  @Post('notification/sendContactEmail')
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
