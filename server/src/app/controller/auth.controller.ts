import { Controller, Get, Res, Post, Delete, Put, Body, Param, Query, Inject, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserRegisterDataDTO } from '../../domain/model/auth/register/user-register-data.dto.type';
import { IAuthService } from '../../domain/input/port/auth.service.interface';
import { StartConfirmEmailData } from '../../domain/model/auth/register/start.confirm.email.data';
import { StartRecoveryDataDTO } from '../../domain/model/auth/recovery/start-recovery-data.dto.type';
import { VerificationCodeDataDTO } from '../../domain/model/auth/register/verification_code_data.dto.type';
import { RecoveryUpdateDataDTO } from '../../domain/model/auth/recovery/recovery-update-data.dto.type';
import { LoginFormDTO } from '../../domain/model/auth/login/login-form.dto';
import { IAuthResponse } from '../../domain/model/auth/auth-response.interface';
import { LogoutFormDTO } from '../../domain/model/auth/login/logout-form.dto';

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

  @Post('register/confirm/start')
  sendStartEmailConfirm(@Body() startConfirmEmailData: StartConfirmEmailData): any {
    console.log(startConfirmEmailData);

    try {
      const sentInfo = this.authService.sendStartEmailConfirm(startConfirmEmailData);
      return sentInfo;
    } catch (e) {
      return e.message;
    };
  };

  @Post('register/confirm')
  async confirmAccount(@Body() verificationCodeData: VerificationCodeDataDTO): Promise<any> {
    console.log("register/confirm executed!");
    return this.authService.confirmAccount(verificationCodeData);

  };

  @Post('login')
  async login(@Res() res, @Body() loginForm: LoginFormDTO){
    const authResponse: IAuthResponse = await this.authService.login(loginForm);
    if (authResponse.isSuccess) return res.status(HttpStatus.OK).json(authResponse.data);
    return res.status(HttpStatus.UNAUTHORIZED).json(authResponse.data);
  };
  
  @Post('logout')
  async logout(@Res() res, @Body() logoutFormDTO: LogoutFormDTO){
    const authResponse: IAuthResponse = await this.authService.logout(logoutFormDTO);
    if (authResponse.isSuccess) return res.status(HttpStatus.OK).json(authResponse.data);
    return res.status(HttpStatus.UNAUTHORIZED).json(authResponse.data);
  };

  @Post('recovery/start')
  sendEmailToRecoveryPass(@Body() startRecoveryDataDTO: StartRecoveryDataDTO): any {
    console.log(startRecoveryDataDTO);

    try {
      const sentInfo = this.authService.sendEmailToRecoveryPass(startRecoveryDataDTO);
      return sentInfo;
    } catch (e) {
      return e.message;
    };
  };

  @Post('recovery/update')
  recoveryUpdatePassword(@Body() recoveryUpdateDataDTO: RecoveryUpdateDataDTO): any {
    console.log(recoveryUpdateDataDTO);

    try {
      const sentInfo = this.authService.recoveryUpdatePassword(recoveryUpdateDataDTO);
      return sentInfo;
    } catch (e) {
      return e.message;
    };
  };

}
