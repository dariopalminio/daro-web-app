import { Controller, Res, Get, Post, Body, Inject, Headers, HttpStatus } from '@nestjs/common';
import { INotificationService } from '../../domain/service/interface/notification.service.interface';
import { ContactMessage } from '../../domain/model/notification/contact.message';
import { IGlobalConfig } from '../../domain/output-port/global-config.interface';
import { HelloWorldDTO } from '../dto/hello-world.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmailDataDTO } from '../../domain/model/notification/email-data-dto';
import { IServiceResponse } from '../../domain/model/service/service-response.interface';


@Controller('notifications')
export class NotificationController {

  constructor(
    @Inject('INotificationService')
    private readonly supportService: INotificationService,
    @Inject('IGlobalConfig')
    private readonly globalConfig: IGlobalConfig,
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
      status: HttpStatus.OK,
      message: "Hello World from notification service " + this.globalConfig.get<string>('VERSION') + "!",
      name: "notification",
      version: this.globalConfig.get<string>('VERSION'),
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

    const sentInfo = await this.supportService.sendContactEmail(contactMessage, lang);
    if (sentInfo.isSuccess) return res.status(HttpStatus.OK).json(sentInfo);
    return res.status(sentInfo.status).json(sentInfo);
  };

  @Post('sendEmail')
  async sendEmail(@Res() res, @Body() emailDataDTO: EmailDataDTO) {

    const sentInfo: IServiceResponse = await this.supportService.sendEmail(emailDataDTO.subject, emailDataDTO.email, emailDataDTO.content);
    if (sentInfo.isSuccess) return res.status(HttpStatus.OK).json(sentInfo);
    return res.status(sentInfo.status).json(sentInfo);

  };

};
