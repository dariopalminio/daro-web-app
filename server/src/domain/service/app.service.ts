import { Injectable } from '@nestjs/common';
import { IAppService } from '../../domain/service/interface/IAppService';

@Injectable()
export class AppService implements IAppService{

  getHello(): string {
    return 'Hello World! This is web shop backend server v1.0';
  }

};
