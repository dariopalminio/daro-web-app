import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World! This is web shop backend server v1.0';
  }

};
