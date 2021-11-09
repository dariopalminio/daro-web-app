import { Controller, Get, Post, Body, Inject} from '@nestjs/common';
import * as GlobalConfig from '../../GlobalConfig';

@Controller()
export class AppController {
  

  @Get()
  getHello(): string {
    return "Hello World! From " + GlobalConfig.APP_NAME + " " + GlobalConfig.VERSION;
  }

}
