import { Controller, Get, Res, Post, Delete, Put, Body, Param, Query, Inject, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserRegisterDataDTO } from '../../domain/model/register/user-register-data.dto.type';
import { IAuthService } from '../../domain/input/port/auth.service.interface';
import { StartConfirmEmailData } from '../../domain/model/register/start.confirm.email.data';
import { EndConfirmEmailData } from '../../domain/model/register/end.confirm.email.data';
import { VerificationCodeDataDTO } from '../../domain/model/register/verification_code_data.dto.type';

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

  @Post('register/confirm/sendStartEmailConfirm')
  sendStartEmailConfirm(@Body() startConfirmEmailData: StartConfirmEmailData): any {
    console.log(startConfirmEmailData);

    try {
      const sentInfo = this.authService.sendStartEmailConfirm(startConfirmEmailData);
      return sentInfo;
    } catch (e) {
      return e.message;
    };
  }

  @Post('register/confirm/sendEndEmailConfirm')
  sendEndEmailConfirm(@Body() sendConfirmEmailData: EndConfirmEmailData): any {
    console.log(sendConfirmEmailData);

    try {
      const sentInfo = this.authService.sendEndEmailConfirm(sendConfirmEmailData);
      return sentInfo;
    } catch (e) {
      return e.message;
    };
  }

  @Post('register/confirm/isVerificationCodeOk')
  async isVerificationCodeOk(@Body() verificationCodeData: VerificationCodeDataDTO): Promise<any> {
    console.log("isVerificationCodeOk executed!");
    return this.authService.isVerificationCodeOk(verificationCodeData);

  };

}
