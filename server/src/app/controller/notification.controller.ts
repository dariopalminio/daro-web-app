import { Controller, Res, Get, Post, Body, Inject, Headers, HttpStatus } from '@nestjs/common';
import { INotificationService } from '../../domain/service/interface/notification.service.interface';
import { ContactMessage } from '../../domain/model/notification/contact.message';
import * as GlobalConfig from '../../infra/config/global-config';
import { HelloWorldDTO } from '../dto/hello-world.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmailDataDTO } from '../../domain/model/notification/email-data-dto';


@Controller('notification')
export class NotificationController {

  constructor(
    @Inject('INotificationService')
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
  async sendContactEmail(@Headers() headers, @Res() res, @Body() contactMessage: ContactMessage) {
    console.log(contactMessage);
    let lang = 'en';
 
    if (headers && headers.lang) {
      lang = headers.lang;
    }
    try {
      const sentInfo = await this.supportService.sendContactEmail(contactMessage, lang);
      return res.status(HttpStatus.OK).json(sentInfo);
    } catch (e) {
      const data = {error: e.message};
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data);
    };
  };

  @Post('sendEmail')
  async sendEmail(@Res() res, @Body() emailDataDTO: EmailDataDTO) {
    console.log(emailDataDTO);

    try {
      const sentInfo = await this.supportService.sendEmail(emailDataDTO.subject,emailDataDTO.email,emailDataDTO.content);
      return res.status(HttpStatus.OK).json(sentInfo);
    } catch (e) {
      const data = {error: e.message};
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data);
    };
  };



}
