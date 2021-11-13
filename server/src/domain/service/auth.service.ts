import { Injectable, Inject } from '@nestjs/common';
import { IAuthService } from '../service/interface/auth.service.interface';
import { IAuth } from '../output-port/auth.interface';
import { UserRegisterDataDTO } from '../model/auth/register/user-register-data.dto.type';
import { IUserService } from '../../domain/service/interface/user.service.interface';
import { UserRegisterDTO } from '../model/auth/register/user-register.dto.type';
import IEmailSender from '../output-port/email-sender.interface';
import { validEmail } from '../helper/validators.helper';
import * as GlobalConfig from '../../infra/config/global-config';
import { generateToken, encodeToken, createTokenLink, decodeToken } from '../helper/token.helper';
import { StartConfirmEmailData } from '../model/auth/register/start-confirm-email-data';
import { StartRecoveryDataDTO } from '../../domain/model/auth/recovery/start-recovery-data.dto.type';
import { VerificationCodeDataDTO } from '../model/auth/register/verification-code-data.dto.type';
import { RecoveryUpdateDataDTO } from '../model/auth/recovery/recovery-update-data.dto.type';
import { IAuthResponse } from '../../domain/model/auth/auth-response.interface';
import { LoginFormDTO } from '../../domain/model/auth/login/login-form.dto';
import { LogoutFormDTO } from '../../domain/model/auth/login/logout-form.dto';
import { IUser } from '../model/user/user.interface';
import { ITranslator } from '../../domain/output-port/translator.interface';

/**
 * Authorization service
 */
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IAuth')
    private readonly externalAuthService: IAuth,
    @Inject('IUserService')
    private readonly userService: IUserService,
    @Inject('IEmailSender')
    readonly sender: IEmailSender,
    @Inject('ITranslator')
    private readonly i18n: ITranslator,
  ) {
  }


  /**
   * Register
   * 
   * Create a new user in authentication server and in data base.
   * The user will have the email without confirming until he confirms it.
   * @param userRegisterData 
   * @returns 
   */
  async register(userRegisterData: UserRegisterDataDTO): Promise<IAuthResponse> {

    // First: obtains admin access token
    let adminToken;
    try {
      adminToken = await this.externalAuthService.getAdminToken();
    } catch (error) {
      return { isSuccess: false, status: 500, message: "Could not get admin acces token from auth server!", data: error };
    }
    // Second: creates a new user in authorization server using admin access token
    const authCreatedUserResp = await this.externalAuthService.register(userRegisterData.username,
      userRegisterData.firstName, userRegisterData.lastName, userRegisterData.email,
      userRegisterData.password, adminToken);

    const { isSuccess } = authCreatedUserResp;
    if (!isSuccess) {
      // ERROR: User could not be created in auth server!
      return authCreatedUserResp;
    }

    // Third: verifies that the user was created, asking for the information of the created user
    const authCreatedUser = await this.externalAuthService.getUserInfoByAdmin(userRegisterData.email, adminToken);

    if (!authCreatedUser) {
      // ERROR: User could not be created in auth server
      return { isSuccess: false, status: 500, message: "User could not be created in auth server!", data: {} };
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
      } catch (error) {
        console.log("User could not be deleted in externa auth service! ", error);
      }
      return { isSuccess: false, status: 500, message: "User could not be created in database server!", data: {} };
    }

    return authCreatedUserResp;
  };

  /**
   * Send Start Email Confirm
   * Send an email-verification email to the user An email contains a link the user can click to verify their email address.
   * 
   * @param startConfirmEmailData 
   * @returns 
   */
  async sendStartEmailConfirm(startConfirmEmailData: StartConfirmEmailData): Promise<IAuthResponse> {

    try {

      if (!validEmail(startConfirmEmailData.email)) throw new Error("Invalid email!");

      let user = await this.userService.getByQuery({ userName: startConfirmEmailData.userName });
      if (!user) throw new Error("User not found!");

      const newVerificationCode = generateToken(); //generate verification code
      user.verificationCode = newVerificationCode;

      const updatedOk: boolean = await this.userService.updateById(user._id, user);
      if (!updatedOk) throw new Error("Can not save generated verification code!");

      const token: string = encodeToken(startConfirmEmailData.email, newVerificationCode);
      const verificationLink = createTokenLink(startConfirmEmailData.verificationPageLink, token);

      const line1 = await this.i18n.translate('auth.REGISTER_START_EMAIL.HEY',
        { args: { name: startConfirmEmailData.name }, });
      const line2 = await this.i18n.translate('auth.REGISTER_START_EMAIL.WELCOME',
        { args: { company: GlobalConfig.COMPANY_NAME }, });
      const line3 = await this.i18n.translate('auth.REGISTER_START_EMAIL.CONFIRM_INFO',);
      const line4 = await this.i18n.translate('auth.REGISTER_START_EMAIL.VERIFICATION_LINK',);
      const line5 = await this.i18n.translate('auth.REGISTER_START_EMAIL.THANK',
        { args: { company: GlobalConfig.COMPANY_NAME }, });

      const contentHTML = `
    <p>${line1}!</p>
    <p>${line2}</p>
    <p>${line3}</p>
    <h1>${line4}: ${verificationLink}</h1>
    <p>${line5}</p>
    `;
      console.log("contentHTML:", contentHTML);

      const subject: string = await this.i18n.translate('auth.REGISTER_START_EMAIL.SUBJECT', { args: { company: GlobalConfig.COMPANY_NAME }, });
      const emailResponse: any = this.sender.sendEmail(subject, startConfirmEmailData.email, contentHTML);

      return {
        isSuccess: true,
        status: 200,
        message: "An email-verification was sent to the user with a link the user can click to verify their email address!",
        data: emailResponse
      };

    } catch (error) {
      return {
        isSuccess: false,
        status: 500,
        message: error.message,
        data: error
      };
    };
  };

  /**
   * Confirm Account
   * Confirm account from an email-verification action by user.
   * 
   * @param verificationCodeData 
   * @returns 
   */
  async confirmAccount(verificationCodeData: VerificationCodeDataDTO): Promise<IAuthResponse> {

    let user: IUser = null;
    try {
      user = await this.verificateToken(verificationCodeData.token);
    } catch (error) {
      console.log(error);
      const authResponse: IAuthResponse = {
        isSuccess: false,
        status: 400, //BAD_REQUEST
        message: error.message,
        data: { message: "Invalid token!" }
      };
      return authResponse;
    }
    console.log("Token OK!!!");
    //Update user to verificated

    //Update in external auth server
    let adminToken;
    try {
      adminToken = await this.externalAuthService.getAdminToken();
    } catch (error) {
      return { isSuccess: false, status: 500, message: "Could not get admin acces token from auth server!", data: error };
    }
    const updetedAuthUser: IAuthResponse = await this.externalAuthService.confirmEmail(user.authId, user.email, adminToken);

    if (!updetedAuthUser.isSuccess) {
      return updetedAuthUser;
    }

    //Update in database
    const discardVerificationCode = generateToken(); //generate verification code to invalidate future uses
    user.verified = true;
    user.verificationCode = discardVerificationCode; //verification code to invalidate future uses
    const updatedOk: boolean = await this.userService.updateById(user._id, user);

    if (!updatedOk) {
      console.log("Can not update email verified in data base for user:", user);
    }

    //Notificate to user
    try {
      this.sendSuccessfulEmailConfirm(user.firstName, user.email);
    } catch (error) {
      //Could not be notified about confirmation of account 
      console.log(error);
    }

    //Successful response
    const authResponse: IAuthResponse = {
      isSuccess: true,
      status: 200,
      message: "Account confirmed!",
      data: { email: user.email }
    };

    return authResponse;
  };

  /**
   * Send email to notificate successful confirmation
   * Send email with welcome message to end registration process.
   * @param 
   * @returns 
   */
  private async sendSuccessfulEmailConfirm(name: string, email: string): Promise<any> {

    try {
      const line1 = await this.i18n.translate('auth.REGISTER_END_EMAIL.HEY',
        { args: { name: name }, });
      const line2 = await this.i18n.translate('auth.REGISTER_END_EMAIL.SUCCESS',);
      const line3 = await this.i18n.translate('auth.REGISTER_END_EMAIL.THANK',
        { args: { company: GlobalConfig.COMPANY_NAME }, });

      const contentHTML = `
          <p>${line1}</p>
          <p>${line2}</p>
          <p>${line3}</p>
          `;
      const subject: string = await this.i18n.translate('auth.REGISTER_END_EMAIL.SUBJECT',
        { args: { company: GlobalConfig.COMPANY_NAME }, });
      return this.sender.sendEmail(subject, email, contentHTML);
    } catch (error) {
      throw error;
    };
  };

  /**
   * send email to notificate successful recovery
   * @param name 
   * @param email 
   * @returns 
   */
  private async sendSuccessfulRecoveryEmail(name: string, email: string): Promise<any> {

    try {

      const line1 = await this.i18n.translate('auth.RECOVERY_END_EMAIL.HEY',
        { args: { name: name }, });
      const line2 = await this.i18n.translate('auth.RECOVERY_END_EMAIL.SUCCESS',);
      const line3 = await this.i18n.translate('auth.RECOVERY_END_EMAIL.CONTACT',);
      const line4 = await this.i18n.translate('auth.RECOVERY_END_EMAIL.THANK',
        { args: { company: GlobalConfig.COMPANY_NAME }, });
      const line5 = await this.i18n.translate('auth.RECOVERY_END_EMAIL.NO_REPLY',);

      const contentHTML = `
          <p>${line1}</p>
          <p>${line2}</p>
          <p>${line3}</p>
          <p>${line4}</p>
          <p>${line5}</p>
          `;
      const subject: string = await this.i18n.translate('auth.RECOVERY_END_EMAIL.SUBJECT',
        { args: { company: GlobalConfig.COMPANY_NAME }, });

      return this.sender.sendEmail(subject, email, contentHTML);
    } catch (error) {
      throw error;
    };
  };

  /**
   * login
   * @param loginForm 
   * @returns 
   */
  async login(loginForm: LoginFormDTO): Promise<IAuthResponse> {

    // Validate login form TODO...

    const loginAuthResp = await this.externalAuthService.login(loginForm.username, loginForm.password);
    console.log("Login in service body: ", loginAuthResp);
    return loginAuthResp;
  };

  async logout(logoutFormDTO: LogoutFormDTO): Promise<IAuthResponse> {

    // Validate login form TODO...

    const logoutAuthResp = await this.externalAuthService.logout(logoutFormDTO.id, logoutFormDTO.adminToken);
    return logoutAuthResp;
  };


  /**
   * Send Email To Recovery Password
   * @param startRecoveryDataDTO 
   * @returns 
   */
  async sendEmailToRecoveryPass(startRecoveryDataDTO: StartRecoveryDataDTO): Promise<IAuthResponse> {

    try {
      if (!validEmail(startRecoveryDataDTO.email)) throw new Error("Invalid email!");

      //generate verification code
      const newVerificationCode = generateToken();

      //save verification code
      let user = await this.userService.getByQuery({ userName: startRecoveryDataDTO.userName });
      if (!user) throw new Error("User not found!");

      user.verificationCode = newVerificationCode;
      const updatedOk: boolean = await this.userService.updateById(user._id, user);
      if (!updatedOk) throw new Error("Can not save generated verification code!");

      //send email with link and verification code
      const token: string = encodeToken(startRecoveryDataDTO.email, newVerificationCode);
      const recoveryPageLink = createTokenLink(startRecoveryDataDTO.recoveryPageLink, token);

      //create email content
      const line1 = await this.i18n.translate('auth.RECOVERY_START_EMAIL.FORGOT',);
      const line2 = await this.i18n.translate('auth.RECOVERY_START_EMAIL.CALL_TO_ACTION',);
      const line3 = await this.i18n.translate('auth.RECOVERY_START_EMAIL.LINK',);
      const line4 = await this.i18n.translate('auth.RECOVERY_START_EMAIL.EXPLAIN',);
      const line5 = await this.i18n.translate('auth.RECOVERY_START_EMAIL.NO_REPLY',);
      const line6 = await this.i18n.translate('auth.RECOVERY_START_EMAIL.THANK',
        { args: { company: GlobalConfig.COMPANY_NAME }, });

      const emailContentHTML = `
    <p>${line1}</p>
    <p>${line2}</p>
    <h1>${line3}: ${recoveryPageLink}</h1>
    <p>${line4}</p>
    <p>${line5}</p>
    <p>${line6}</p>
    `;
      const subject: string = await this.i18n.translate('auth.RECOVERY_START_EMAIL.SUBJECT',
        { args: { company: GlobalConfig.COMPANY_NAME }, });

      const emailResponse: any = this.sender.sendEmail(subject, startRecoveryDataDTO.email, emailContentHTML);

      return {
        isSuccess: true,
        status: 200,
        message: "Email was sent To Recovery Password!",
        data: emailResponse
      };
    } catch (error) {
      return {
        isSuccess: false,
        status: 500,
        message: error.message,
        data: error
      };
    };
  };

  /**
   * recoveryUpdatePassword
   * @param recoveryUpdateDataDTO 
   * @returns 
   */
  async recoveryUpdatePassword(recoveryUpdateDataDTO: RecoveryUpdateDataDTO): Promise<IAuthResponse> {
    let user: IUser = null;
    try {
      user = await this.verificateToken(recoveryUpdateDataDTO.token);
    } catch (error) {
      const authResponse: IAuthResponse = {
        isSuccess: false,
        status: 400, //BAD_REQUEST
        message: error.message,
        data: { message: "Invalid token!" }
      };
      return authResponse;
    }

    //Update password in user
    //Update in external auth server
    let adminToken;
    try {
      adminToken = await this.externalAuthService.getAdminToken();
    } catch (error) {
      return { isSuccess: false, status: 500, message: "Could not get admin acces token from auth server!", data: error };
    }
    const newPassword = recoveryUpdateDataDTO.password;
    const updetedAuthUser: IAuthResponse = await this.externalAuthService.resetPassword(user.authId, newPassword, adminToken);
    console.log(updetedAuthUser);
    if (!updetedAuthUser.isSuccess) {
      return updetedAuthUser;
    }

    //Update in database
    const discardVerificationCode = generateToken(); //generate verification code to invalidate future uses
    user.verificationCode = discardVerificationCode; //set verification code to invalidate future uses
    const updatedOk: boolean = await this.userService.updateById(user._id, user);

    if (!updatedOk) {
      console.log("Can not to reset verification code in data base for user:", user);
    }

    //Notificate to user
    try {
      this.sendSuccessfulRecoveryEmail(user.firstName, user.email);
    } catch (error) {
      //Could not be notified about changed password 
      console.log(error);
    }

    //Successful response
    const authResponse: IAuthResponse = {
      isSuccess: true,
      status: 200,
      message: undefined,
      data: { email: user.email }
    };

    return authResponse;
  };

  /**
   * Verify that the token sent by user is the same as the one saved in the database,
   * for the user with the email encoded within the token.
   * @param token 
   * @returns 
   */
  private async verificateToken(token: string): Promise<IUser> {

    //Validate token
    if (!token) throw Error("Invalid verification code token!");

    const partsArray = decodeToken(token);
    const decodedEmail = partsArray[0];
    const decodedCode = partsArray[1];

    //Validate data
    if (!validEmail(decodedEmail)) throw Error("Invalid Email!");

    //Verificate code
    let user: IUser = await this.userService.getByQuery({
      userName: decodedEmail,
      verificationCode: decodedCode,
    });

    if (user == null) {
      throw Error("Not found or verification code is wrong!");
    }

    return user;
  };

};
