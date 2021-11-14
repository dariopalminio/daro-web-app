import { Controller, Get, Res, Post, Body, Inject, Headers} from '@nestjs/common';
import * as GlobalConfig from '../../infra/config/global-config';
import { HelloWorldDTO } from '../dto/hello-world.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { ITranslator } from '../../domain/output-port/translator.interface';


@Controller()
export class AppController {
  
  constructor(    
    @Inject('ITranslator')
    private readonly myi18n: ITranslator,
    @Inject('I18nRequestScopeService')
    private readonly i18n: I18nRequestScopeService,
  ) {}

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
  async getHello(@Headers() headers, @Res() res) {

    let lang = 'en';
 
    if (headers && headers.lang) {
      lang = headers.lang;
    }

    const options = {
      lang: lang,
      args: { app: GlobalConfig.APP_NAME, version: GlobalConfig.VERSION },
    };
    console.log("getHello________________________headers.locale:", lang);
    console.log(await this.i18n.translate('app.HELLO_MESSAGE',{
      args: { app: GlobalConfig.APP_NAME, version: GlobalConfig.VERSION },
    }));
    console.log(await this.i18n.translate('app.HELLO_MESSAGE', options));
    console.log("myi18n:");
    console.log(await this.myi18n.translate('app.HELLO_MESSAGE', options));
    

    const response: HelloWorldDTO = {
      isSuccess: true,
      status: 200,
      message: await this.i18n.translate('app.HELLO_MESSAGE', options),
      name: GlobalConfig.APP_NAME,
      version: GlobalConfig.VERSION,
      date: new Date()
    };
    return res.status(200).json(response);
  };
};
