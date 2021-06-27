import { Controller, Get, Post, Body, Inject} from '@nestjs/common';
import { IAppService } from '../../domain/input/port/IAppService';

export const APP_SERVICE_INJECTED = 'AppService_Implementation';

@Controller()
export class AppController {
  
  constructor(
    @Inject(APP_SERVICE_INJECTED)
    private readonly appService: IAppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
