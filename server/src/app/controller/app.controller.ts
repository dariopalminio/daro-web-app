import { Controller, Get, Post, Body, Inject} from '@nestjs/common';


@Controller()
export class AppController {
  

  @Get()
  getHello(): string {
    return "Hello World!";
  }

}
