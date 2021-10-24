import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { IUserService } from '../../domain/input/port/user.service.interface';
import { ContactMessage } from '../../domain/model/contact.message';
import { StartConfirmEmailData } from '../../domain/model/register/start.confirm.email.data';
import { EndConfirmEmailData } from '../../domain/model/register/end.confirm.email.data';
import { VerificationCodeData } from '../../domain/model/register/verification_code_data';

export const USER_SERVICE_TOKEN = 'UserService_Implementation';

@Controller('user')
export class UserController {

  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly userService: IUserService
  ) { }


  @Get()
  getHello(): string {
    return "Hello World!";
  }

  @Post('sendStartEmailConfirm')
  sendStartEmailConfirm(@Body() startConfirmEmailData: StartConfirmEmailData): any {
    console.log(startConfirmEmailData);

    try {
      const sentInfo = this.userService.sendStartEmailConfirm(startConfirmEmailData);
      return sentInfo;
    } catch (e) {
      return e.message;
    };
  }

  @Post('sendEndEmailConfirm')
  sendEndEmailConfirm(@Body() sendConfirmEmailData: EndConfirmEmailData): any {
    console.log(sendConfirmEmailData);

    try {
      const sentInfo = this.userService.sendEndEmailConfirm(sendConfirmEmailData);
      return sentInfo;
    } catch (e) {
      return e.message;
    };
  }

  @Post('isVerificationCodeOk')
  async isVerificationCodeOk(verificationCodeData: VerificationCodeData): Promise<any> {

    return this.userService.isVerificationCodeOk(verificationCodeData);

};

}
