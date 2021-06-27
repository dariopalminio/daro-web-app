import { Controller, Get, Post, Body, Inject} from '@nestjs/common';
import { IAppService } from '../../domain/input/port/IAppService';


@Controller()
export class AppController {
  

  @Get()
  getHello(): string {
    return "Hello World!";
  }

}
