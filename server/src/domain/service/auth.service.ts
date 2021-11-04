import { Injectable, Inject } from '@nestjs/common';
import { IAuthService } from '../input/port/auth.service.interface';
import { IAuth } from '../../domain/output/port/auth.interface';
import { UserRegisterDataDTO } from '../../domain/model/register/user-register-data.dto.type';
import { IUserService } from '../../domain/input/port/user.service.interface';
import { UserRegisterDTO } from '../model/register/user_register.dto.type';
import { EMAIL_SENDER_TOKEN } from '../service/notification.service';
import IEmailSender from '../output/port/email.sender.interface';
import { validEmail } from '../helper/validators.helper';
import * as GlobalConfig from '../../GlobalConfig';
import { generateToken, encodeToken, createTokenLink, decodeToken } from '../helper/token.helper';
import { StartConfirmEmailData } from '../model/register/start.confirm.email.data';
import { EndConfirmEmailData } from '../model/register/end.confirm.email.data';
import { VerificationCodeDataDTO } from '../model/register/verification_code_data.dto.type';
import { IAuthResponse } from '../../domain/output/port/auth.interface';


export const AUTH_IMPL_TOKEN = 'Auth_Implementation'; //Implementation Token
export const USER_SERVICE_IMPL_TOKEN = 'UserService_Implementation'; //Implementation Token

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(AUTH_IMPL_TOKEN)
    private readonly externalAuthService: IAuth,
    @Inject(USER_SERVICE_IMPL_TOKEN)
    private readonly userService: IUserService,
    @Inject(EMAIL_SENDER_TOKEN)
    readonly sender: IEmailSender
  ) {
  }


  /**
   * Register
   * 
   * Create a new user in authentication server and in
   * @param userRegisterData 
   * @returns 
   */
  async register(userRegisterData: UserRegisterDataDTO): Promise<any> {

    // First: obtains admin access token
    console.log("First: obtains admin access token");
    const adminToken = await this.externalAuthService.getAdminToken();

    // Second: creates a new user in authorization server using admin access token
    console.log("Second: creates a new user in authorization server using admin access token");
    const authCreatedUserResp = await this.externalAuthService.register(userRegisterData.username,
      userRegisterData.firstName, userRegisterData.lastName, userRegisterData.email,
      userRegisterData.password, adminToken);

    const { isSuccess } = authCreatedUserResp;
    if (!isSuccess) {
      // ERROR: User could not be created in auth server!
      return authCreatedUserResp;
    }

    // Third: verifies that the user was created, asking for the information of the created user
    console.log("Third: verifies that the user was created, asking for the information of the created user");
    const authCreatedUser = await this.externalAuthService.getUserInfoByAdmin(userRegisterData.email, adminToken);

    if (!authCreatedUser) {
      // ERROR: User could not be created in auth server
      return { isSuccess: false, error: "User could not be created in auth server!" };
    }

    const { id } = authCreatedUser; // ID in external authorization server

    // Four: create new user in user database
    const userRegisterDTO: UserRegisterDTO = {
      authId: id,
      userName: userRegisterData.email,
      firstName: userRegisterData.firstName,
      lastName: userRegisterData.lastName,
      email: userRegisterData.email,
    }
    const wasCreated: boolean = await this.userService.create(userRegisterDTO);
    if (!wasCreated) {
      // ERROR: User could not be created in user database!
      try {
        const deletedAuthUser = await this.externalAuthService.deleteAuthUser(id, adminToken);
        console.log("Deleted user! ", deletedAuthUser);
      } catch(error) {
        console.log("User could not be deleted in externa auth service! ", error);
      }
      return { isSuccess: false, error: "User could not be created in database server!" };
    }

    return authCreatedUserResp;
  };

  /**
   * Send Start Email Confirm
   * Send email with verification code to registration process.
   * 
   * @param startConfirmEmailData 
   * @returns 
   */
  async sendStartEmailConfirm(startConfirmEmailData: StartConfirmEmailData): Promise<any> {

    if (!validEmail(startConfirmEmailData.email)) throw new Error("Invalid email!");

    try {
      const newVerificationCode = generateToken(); //generate verification code

      let user = await this.userService.getByQuery({ userName: startConfirmEmailData.userName });
      if (!user) throw new Error("User not found!");

      user.verificationCode = newVerificationCode;
      const updatedOk: boolean = await this.userService.updateById(user._id, user);
      if (!updatedOk) throw new Error("Can not save generated verification code!");

      const token: string = encodeToken(startConfirmEmailData.email, newVerificationCode);
      const verificationLink = createTokenLink(startConfirmEmailData.verificationPageLink, token);


      const contentHTML = `
    <p>Hey ${startConfirmEmailData.name}!</p>
    <p>Bienvenid@ a ${GlobalConfig.COMPANY_NAME}</p>
    <p>Click on the following link to confirm your email.</p>
    <h1>Verification link: ${verificationLink}</h1>
    <p>Thanks, The team of ${GlobalConfig.COMPANY_NAME}</p>
    `;

      const subject: string = `[${GlobalConfig.COMPANY_NAME}] Please verify your email`;
      return this.sender.sendEmail(subject, startConfirmEmailData.email, contentHTML);

      return true;
    } catch (error) {
      throw error;
    };
  };


  /**
   * isVerificationCodeOk
   * 
   * verificationCodeData.user is email id from Keycloak
   * @param verificationCodeData 
   * @returns 
   */
  async isVerificationCodeOk(verificationCodeData: VerificationCodeDataDTO): Promise<any> {

    console.log("verificationCodeData.token:", verificationCodeData.token);
    const partsArray = decodeToken(verificationCodeData.token);
    const decodedEmail = partsArray[0];
    const decodedCode = partsArray[1];

    console.log("service__>verificationCodeData:", verificationCodeData);
    console.log("service__>decodedEmail:", decodedEmail);
    let user = await this.userService.getByQuery({
      userName: decodedEmail,
      verificationCode: decodedCode,
    });

    console.log(user);

    if (!user) return { verificationCodeStatus: 'false', email: decodedEmail };

    user.verified = true;
    const updatedOk: boolean = await this.userService.updateById(user._id, user);

    return { verificationCodeStatus: 'true', email: decodedEmail };
  };

  /**
 * Send Start Email Confirm
 * Send email with welcome message to end registration process.
 * @param endConfirmEmailData 
 * @returns 
 */
  async sendEndEmailConfirm(endConfirmEmailData: EndConfirmEmailData): Promise<any> {

    if (!validEmail(endConfirmEmailData.email)) throw new Error("Invalid email!");

    try {
      const contentHTML = `
          <p>Hey ${endConfirmEmailData.name}!</p>
          <p>Welcome to the team! The registration was successful.</p>
          <p>Thanks, The team of ${GlobalConfig.COMPANY_NAME}</p>
          `;

      const subject: string = `[${GlobalConfig.COMPANY_NAME}] Registration successful`;

      return this.sender.sendEmail(subject, endConfirmEmailData.email, contentHTML);
    } catch (error) {
      throw error;
    };
  };

  async login(username: string, pass: string): Promise<IAuthResponse>{

    const loginAuthResp = await this.externalAuthService.login(username,pass);
    return loginAuthResp;
  }


};
