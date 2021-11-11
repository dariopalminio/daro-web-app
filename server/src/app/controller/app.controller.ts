import { Controller, Get, Res, Post, Body, Inject} from '@nestjs/common';
import * as GlobalConfig from '../../infra/config/global-config';
import { HelloWorldDTO } from '../dto/hello-world.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  
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
      status: 200,
      message: "Hello World from " + GlobalConfig.APP_NAME + " " + GlobalConfig.VERSION + "!",
      name: GlobalConfig.APP_NAME,
      version: GlobalConfig.VERSION,
      date: new Date()
    };
    return res.status(200).json(response);
  };
};
