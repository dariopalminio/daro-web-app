import { Controller, Get, Res, Post, Delete, Put, Body, Param, Query, Inject, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserRegisterDataDTO } from '../../domain/model/register/user-register-data.dto.type';
import { IAuthService } from '../../domain/input/port/auth.service.interface';

export const AUTH_SERVICE_TOKEN = 'AuthService_Implementation';

@Controller('auth')
export class AuthController {

  constructor(
    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authService: IAuthService
  ) { }


  @Get()
  getHello(): string {
    return "Hello World! I'm Auth Service...";
  };


  @Post('register')
  async register(@Res() res, @Body() userRegisterDTO: UserRegisterDataDTO) {


    const result = await this.authService.register(userRegisterDTO);

    if (!result.isSuccess) {

      throw new BadRequestException(result.error);
    }
    console.log("Controller HttpStatus.CREATED", HttpStatus.CREATED);
    return res.status(HttpStatus.CREATED).send();
  };


}
