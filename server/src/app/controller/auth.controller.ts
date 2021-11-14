import { Controller, Get, Res, Post, Headers, Delete, Put, Body, Param, Query, Inject, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserRegisterDataDTO } from '../../domain/model/auth/register/user-register-data.dto.type';
import { IAuthService } from '../../domain/service/interface/auth.service.interface';
import { StartConfirmEmailDataDTO } from '../../domain/model/auth/register/start-confirm-email-data.dto';
import { StartRecoveryDataDTO } from '../../domain/model/auth/recovery/start-recovery-data.dto.type';
import { VerificationCodeDataDTO } from '../../domain/model/auth/register/verification-code-data.dto.type';
import { RecoveryUpdateDataDTO } from '../../domain/model/auth/recovery/recovery-update-data.dto.type';
import { LoginFormDTO } from '../../domain/model/auth/login/login-form.dto';
import { AuthResponseDTO } from '../../domain/model/auth/auth-response.dto';
import { LogoutFormDTO } from '../../domain/model/auth/login/logout-form.dto';
import * as GlobalConfig from '../../infra/config/global-config';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HelloWorldDTO } from '../dto/hello-world.dto';


@Controller('auth')
export class AuthController {

  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService
  ) { }

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
      message: "Hello World from auth " + GlobalConfig.VERSION + "!",
      name: "auth",
      version: GlobalConfig.VERSION,
      date: new Date()
    };
    return res.status(200).json(response);
  };

  @ApiOperation({
    summary:
      'Create new user as register process.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Successfully created user',
    type: AuthResponseDTO,
  })
  @Post('register')
  async register(@Res() res, @Body() userRegisterDTO: UserRegisterDataDTO): Promise<any> {

    const result: AuthResponseDTO = await this.authService.register(userRegisterDTO);
    console.log("register controller:",result);
    return res.status(result.status).json(result);

  };

  @ApiOperation({
    summary:
      'Send email to user with a link to confirm account page.',
  })
  @ApiResponse({
    status: 200,
    description:
      'An email-verification was sent to the user with a link the user can click to verify their email address!',
    type: AuthResponseDTO,
  })
  @Post('register/confirm/start')
  async sendStartEmailConfirm(@Headers() headers, @Res() res, @Body() startConfirmEmailData: StartConfirmEmailDataDTO) {

    const result: AuthResponseDTO = await this.authService.sendStartEmailConfirm(startConfirmEmailData, this.getLang(headers));
    return res.status(result.status).json(result);
  };

  @ApiOperation({
    summary:
      'Confirm account from an email-verification action by user.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Account confirmed!',
    type: AuthResponseDTO,
  })
  @Post('register/confirm')
  async confirmAccount(@Headers() headers, @Res() res,@Body() verificationCodeData: VerificationCodeDataDTO): Promise<any> {

    const authResponse: AuthResponseDTO = await this.authService.confirmAccount(verificationCodeData, this.getLang(headers));
    return res.status(authResponse.status).json(authResponse);
  };

  @ApiOperation({
    summary:
      'Authenticate user with username and password. Consumer cliente for login on Keycloak Server & Bearer Token & with client secret configured with OpenID Endpoint configuration, Login with email = true and Access Type = public',
  })
  @ApiResponse({
    status: 200,
    description:
      'Authenticated!',
    type: AuthResponseDTO,
  })
  @Post('login')
  async login(@Res() res, @Body() loginForm: LoginFormDTO){
    const authResponse: AuthResponseDTO = await this.authService.login(loginForm);
    if (authResponse.isSuccess) return res.status(HttpStatus.OK).json(authResponse.data);
    console.log("Login in controller: ", authResponse);
    return res.status(HttpStatus.UNAUTHORIZED).json(authResponse);
  };
  
  @ApiOperation({
    summary:
      'Remove all user sessions associated with the user in auth server. Also send notification to all clients that have an admin URL to invalidate the sessions for the particular user.',
  })
  @ApiResponse({
    status: 200,
    description:
      'logout!',
    type: AuthResponseDTO,
  })
  @Post('logout')
  async logout(@Res() res, @Body() logoutFormDTO: LogoutFormDTO){
    const authResponse: AuthResponseDTO = await this.authService.logout(logoutFormDTO);
    if (authResponse.isSuccess) return res.status(HttpStatus.OK).json(authResponse);
    return res.status(HttpStatus.UNAUTHORIZED).json(authResponse);
  };

  @ApiOperation({
    summary:
      'Send Email with link To Recovery Password.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Email was sent To Recovery Password!',
    type: AuthResponseDTO,
  })
  @Post('recovery/start')
  async sendEmailToRecoveryPass(@Headers() headers, @Res() res, @Body() startRecoveryDataDTO: StartRecoveryDataDTO) {

console.log("sendEmailToRecoveryPass getLang:",this.getLang(headers));
console.log("sendEmailToRecoveryPass startRecoveryDataDTO:",startRecoveryDataDTO);

    const authResponse: AuthResponseDTO = await this.authService.sendEmailToRecoveryPass(startRecoveryDataDTO, this.getLang(headers));
    return res.status(authResponse.status).json(authResponse);

  };

  @ApiOperation({
    summary:
      'Set up a new password for the user.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Password has been updated successful!',
    type: AuthResponseDTO,
  })
  @Post('recovery/update')
  async recoveryUpdatePassword(@Headers() headers, @Res() res, @Body() recoveryUpdateDataDTO: RecoveryUpdateDataDTO) {
      const authResponse: AuthResponseDTO = await this.authService.recoveryUpdatePassword(recoveryUpdateDataDTO, this.getLang(headers));
      return res.status(authResponse.status).json(authResponse);
  };

  private getLang(headers: any): string{
    if (headers && headers.lang) return headers.lang;
    return 'en';
  };
  
};
