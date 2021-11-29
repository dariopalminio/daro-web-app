import { Controller, Get, Res, Post, Body, Inject, Headers } from '@nestjs/common';
import * as GlobalConfig from '../../infra/config/global-config';
import { HelloWorldDTO } from '../dto/hello-world.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ITranslator } from '../../domain/output-port/translator.interface';
import { IGlobalConfig } from '../../domain/output-port/global-config.interface';

@Controller()
export class AppController {

  constructor(
    @Inject('ITranslator')
    private readonly myI18n: ITranslator,
    @Inject('IGlobalConfig')
    private readonly globalConfig: IGlobalConfig,
  ) { };

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
      args: {
        app: this.globalConfig.get<string>('APP_NAME') as string,
        version: this.globalConfig.get<string>('VERSION') as string
      },
    };

    const response: HelloWorldDTO = {
      isSuccess: true,
      status: 200,
      message: await this.myI18n.translate('app.HELLO_MESSAGE', options),
      name: GlobalConfig.APP_NAME,
      version: GlobalConfig.VERSION,
      date: new Date()
    };
    return res.status(200).json(response);
  };

  @Get('i18n')
  async getI18n(@Headers() headers, @Res() res) {

    let lang = 'en';

    if (headers && headers.lang) {
      lang = headers.lang;
    }

    const options = {
      lang: lang,
      args: {
        app: this.globalConfig.get<string>('APP_NAME') as string,
        version: this.globalConfig.get<string>('VERSION') as string
      },
    };

    const response = {

      message: await this.myI18n.translate('app.HELLO', options),

    };
    return res.status(200).json(response);
  };
};
