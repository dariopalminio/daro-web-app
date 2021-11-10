import { Controller, Res, Get, Post, Body, Inject } from '@nestjs/common';
import { INotificationService } from '../../domain/service/interface/notification.service.interface';
import { ContactMessage } from '../../domain/model/contact.message';
import * as GlobalConfig from '../../GlobalConfig';
import { HelloWorldDTO } from '../dto/hello-world.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


export const SUPPORT_SERVICE_TOKEN = 'SupportService_Implementation';

@Controller('notification')
export class NotificationController {

  constructor(
    @Inject(SUPPORT_SERVICE_TOKEN)
    private readonly supportService: INotificationService
  ) { }


  @ApiOperation({
    summary:
      'Hello world is get method to do Ping and test this service.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Succefully Ping',
    type: HelloWorldDTO,
  })
  @Get()
  getHello(@Res() res) {
    const response: HelloWorldDTO = {
      isSuccess: true,
      status: 200,
      message: "Hello World from notification service " + GlobalConfig.VERSION + "!",
      name: "notification",
      version: GlobalConfig.VERSION,
      date: new Date()
    };
    return res.status(200).json(response);
  };

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
