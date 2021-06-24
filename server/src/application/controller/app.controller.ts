import { Controller, Get, Post, Body, Inject} from '@nestjs/common';
import { IAppService } from '../../domain/service/interface/IAppService';

export const APP_SERVICE = 'AppService';

@Controller()
export class AppController {
  
  constructor(
    @Inject("AppService")
    private readonly appService: IAppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
