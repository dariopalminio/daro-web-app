import { Injectable, Inject } from '@nestjs/common';
import { IAuthService } from '../service/interface/auth.service.interface';
import { IAuth } from '../output-port/auth.interface';
import { UserRegisterDataDTO } from '../model/auth/register/user-register-data.dto.type';
import { IUserService } from '../../domain/service/interface/user.service.interface';
import { UserRegisterDTO } from '../model/auth/register/user-register.dto.type';
import IEmailSender from '../output-port/email-sender.interface';
import { validEmail } from '../helper/validators.helper';
import { generateToken, encodeToken, createTokenLink, decodeToken } from '../helper/token.helper';
import { StartConfirmEmailDataDTO } from '../model/auth/register/start-confirm-email-data.dto';
import { ParamsRegisterStart } from '../model/auth/register/params-register-start.type';
import { StartRecoveryDataDTO } from '../../domain/model/auth/recovery/start-recovery-data.dto.type';
import { VerificationCodeDataDTO } from '../model/auth/register/verification-code-data.dto.type';
import { RecoveryUpdateDataDTO } from '../model/auth/recovery/recovery-update-data.dto.type';
import { IServiceResponse } from '../../domain/model/service/service-response.interface';
import { LoginFormDTO } from '../../domain/model/auth/login/login-form.dto';
import { LogoutFormDTO } from '../../domain/model/auth/login/logout-form.dto';
import { IUser } from '../model/user/user.interface';
import { ITranslator } from '../../domain/output-port/translator.interface';
import { ResponseCode } from '../../domain/model/service/response.code.enum';
import { IGlobalConfig } from '../../domain/output-port/global-config.interface';

/**
 * Authorization service
 */
@Injectable()
export class AuthService implements IAuthService {

  constructor(
    @Inject('IAuth')
    private readonly externalAuthService: IAuth,
    @Inject('IUserService')
    private readonly userService: IUserService<IUser>,
    @Inject('IEmailSender')
    readonly sender: IEmailSender,
    @Inject('ITranslator')
    private readonly i18n: ITranslator,
    @Inject('IGlobalConfig')
    private readonly globalConfig: IGlobalConfig,
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
  async register(userRegisterData: UserRegisterDataDTO): Promise<IServiceResponse> {

    //TODO: Validate data (error BadRequestException)

    // First: obtains admin access token
    let adminToken;
    try {
      adminToken = await this.externalAuthService.getAdminToken();
    } catch (error) {
      return {
        isSuccess: false,
        status: ResponseCode.INTERNAL_SERVER_ERROR,
        message: await this.i18n.translate('auth.ERROR.COULD_NOT_GET_ADMIN_TOKEN',),
        data: {}, error:
          error
      };
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
    const response: IServiceResponse = await this.externalAuthService.getUserInfoByAdmin(userRegisterData.email, adminToken);

    if (!response.isSuccess) {
      // ERROR: User could not be created in auth server
      return response;
    }

    const authCreatedUser = response.data.user;
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
      // ERROR: User could not be created in user database
      const errorMsg = await this.i18n.translate('auth.ERROR.USER_COULD_NOT_DELETED_IN_AUTH_SERVICE',);
      //revert operation in auth server (keycloak)
      let deletedAuthUser = {};
      try {
        deletedAuthUser = await this.externalAuthService.deleteAuthUser(id, adminToken);
      } catch (error) {
        console.log(errorMsg, error);
        deletedAuthUser = { error: error }
      }
      const errorData: any = {
        message: errorMsg,
        deleted: deletedAuthUser
      };
      return {
        isSuccess: false,
        status: ResponseCode.INTERNAL_SERVER_ERROR,
        message: errorMsg,
        data: {},
        error: errorData
      };
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
  async sendStartEmailConfirm(startConfirmEmailData: StartConfirmEmailDataDTO, locale: string): Promise<IServiceResponse> {

    // Data validation
    try {
      if (!validEmail(startConfirmEmailData.email))
        throw new Error(await this.i18n.translate('auth.ERROR.INVALID_EMAIL',));
      if (!startConfirmEmailData.verificationPageLink)
        throw new Error(await this.i18n.translate('auth.ERROR.INVALID_LINK',));
    } catch (error) {
      return this.responseBadRequest(error);
    };

    try {

      // Get user
      let user = await this.userService.getByQuery({ userName: startConfirmEmailData.userName });
      if (!user) throw new Error(await this.i18n.translate('auth.ERROR.USER_NOT_FOUND',));

      // Generate new verification code
      const newVerificationCode = generateToken();
      user.verificationCode = newVerificationCode;

      const updatedOk: boolean = await this.userService.updateById(user._id, user);
      if (!updatedOk) throw new Error(await this.i18n.translate('auth.ERROR.CAN_NOT_SAVE_VERIFICATION_CODE',));

      const token: string = encodeToken(startConfirmEmailData.email, newVerificationCode);
      const verificationLink = createTokenLink(startConfirmEmailData.verificationPageLink, token);

      // Prepare params tu email template
      const paramsRegisterStart: ParamsRegisterStart = new ParamsRegisterStart();
      paramsRegisterStart.name = startConfirmEmailData.name;
      paramsRegisterStart.company = this.globalConfig.get<string>('COMPANY_NAME');
      paramsRegisterStart.link = verificationLink;
      const subject: string = await this.i18n.translate('auth.REGISTER_START_EMAIL.SUBJECT', { args: { company: paramsRegisterStart.company }, });

      //Send email
      const emailResponse: any = await this.sender.sendEmailWithTemplate(subject, startConfirmEmailData.email, "register-start", paramsRegisterStart, locale);
      return {
        isSuccess: true,
        status: ResponseCode.OK,
        message: await this.i18n.translate('auth.MESSAGE.SENT_VERIFICATION_EMAIL_SUCCESS',),
        data: emailResponse
      };

    } catch (error) {
      this.responseInternalError(error);
    };
  };

  /**
   * Confirm Account
   * Confirm account from an email-verification action by user.
   * 
   * @param verificationCodeData 
   * @returns 
   */
  async confirmAccount(verificationCodeData: VerificationCodeDataDTO, lang: string): Promise<IServiceResponse> {

    let user: IUser = null;
    try {
      user = await this.verificateToken(verificationCodeData.token);
    } catch (error) {
      return this.responseBadRequest(error);
    };

    //Update user to verificated

    //Update in external auth server
    let adminToken;
    try {
      adminToken = await this.externalAuthService.getAdminToken();
    } catch (error) {
      this.responseInternalError(error);
    }
    const updetedAuthUser: IServiceResponse = await this.externalAuthService.confirmEmail(user.authId, user.email, adminToken);

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
    let notificated: any;
    try {
      notificated = this.sendSuccessfulEmailConfirm(user.firstName, user.email, lang);
    } catch (error) {
      //Could not be notified about confirmation of account 
      notificated = error;
    }

    //Successful response
    const authResponse: IServiceResponse = {
      isSuccess: true,
      status: ResponseCode.OK,
      message: await this.i18n.translate('auth.MESSAGE.CONFIRM_WAS_SUCCESS',),
      data: { notificated: notificated }
    };

    return authResponse;
  };

  /**
   * Send email to notificate successful confirmation
   * Send email with welcome message to end registration process.
   * @param 
   * @returns 
   */
  private async sendSuccessfulEmailConfirm(name: string, email: string, lang: string): Promise<any> {

    try {
      //set params to template
      const paramsRegisterEnd = { name: name, company: this.globalConfig.get<string>('COMPANY_NAME') };
      //Send email
      const subject: string = await this.i18n.translate('auth.REGISTER_END_EMAIL.SUBJECT',
        { args: { company: this.globalConfig.get<string>('COMPANY_NAME') }, });
      const emailResponse: any = this.sender.sendEmailWithTemplate(subject, email, "register-end", paramsRegisterEnd, lang);
      return emailResponse;
    } catch (error) {
      throw error;
    };
  };

  /**
   * login
   * @param loginForm 
   * @returns 
   */
  async login(loginForm: LoginFormDTO): Promise<IServiceResponse> {

    // Validate login form (error BadRequestException)
    try {
      if (!loginForm.username || !loginForm.password)
        throw new Error(await this.i18n.translate('auth.ERROR.INVALID_EMPTY_CREDENTIALS',));
    } catch (error) {
      // Error BadRequestException
      return this.responseBadRequest(error);
    };

    // TODO: Validate if user is disabled by 3 consecutive failed login attempts

    const loginAuthResp = await this.externalAuthService.login(loginForm.username, loginForm.password);

    if (!loginAuthResp.isSuccess) { //failed login attempt
      // TODO: Save failed login attempt
      // TODO: Disable user account after 3 consecutive failed login attempts
    }

    return loginAuthResp;
  };

  /**
   * logout
   * @param logoutFormDTO 
   * @returns 
   */
  async logout(logoutFormDTO: LogoutFormDTO): Promise<IServiceResponse> {

    const userAuthId: string = logoutFormDTO.id;
    try {
      if (!userAuthId)
        throw new Error(await this.i18n.translate('auth.ERROR.INVALID_EMPTY_VALUE',));
    } catch (error) {
      return this.responseBadRequest(error);
    };

    let adminToken: string = logoutFormDTO.adminToken;
    if (!logoutFormDTO.adminToken) {
      try {
        adminToken = await this.externalAuthService.getAdminToken();
      } catch (error) {
        this.responseInternalError(error);
      }
    }

    // Close session in external auth server
    const logoutAuthResp = await this.externalAuthService.logout(userAuthId, adminToken);

    return logoutAuthResp;
  };


  /**
   * Send Email To Recovery Password
   * @param startRecoveryDataDTO 
   * @returns 
   */
  async sendEmailToRecoveryPass(startRecoveryDataDTO: StartRecoveryDataDTO, lang: string): Promise<IServiceResponse> {
    console.log("sendEmailToRecoveryPass lang:", lang);
    try {
      if (!validEmail(startRecoveryDataDTO.email)) throw new Error(await this.i18n.translate('auth.ERROR.INVALID_EMAIL',));
      if (!startRecoveryDataDTO.recoveryPageLink) throw new Error(await this.i18n.translate('auth.ERROR.INVALID_LINK',));
    } catch (error) {
      return this.responseBadRequest(error);
    };

    try {
      //generate verification code
      const newVerificationCode = generateToken();

      //save verification code
      let user = await this.userService.getByQuery({ userName: startRecoveryDataDTO.userName });
      if (!user) throw new Error("User not found!");

      user.verificationCode = newVerificationCode;
      user.startVerificationCode = new Date();

      const updatedOk: boolean = await this.userService.updateById(user._id, user);
      if (!updatedOk) throw new Error(await this.i18n.translate('auth.ERROR.COULD_NOT_SAVE_VERIFICATION_CODE',));

      //send email with link and verification code
      const token: string = encodeToken(startRecoveryDataDTO.email, newVerificationCode);
      const recoveryPageLink = createTokenLink(startRecoveryDataDTO.recoveryPageLink, token);

      //set params to email template
      const params = { recoverylink: recoveryPageLink, company: this.globalConfig.get<string>('COMPANY_NAME') };
      //send email
      const subject: string = await this.i18n.translate('auth.RECOVERY_START_EMAIL.SUBJECT',
        { args: { company: this.globalConfig.get<string>('COMPANY_NAME') }, });
      const emailResponse: any = await this.sender.sendEmailWithTemplate(subject, startRecoveryDataDTO.email, "recovery-start", params, lang);
      return {
        isSuccess: true,
        status: ResponseCode.OK,
        message: await this.i18n.translate('auth.MESSAGE.RECOVERY_EMAIL_SENT',),
        data: emailResponse
      };
    } catch (error) {
      this.responseInternalError(error);
    };
  };

  /**
   * recoveryUpdatePassword
   * @param recoveryUpdateDataDTO 
   * @returns 
   */
  async recoveryUpdatePassword(recoveryUpdateDataDTO: RecoveryUpdateDataDTO, lang: string): Promise<IServiceResponse> {

    let user: IUser = null;

    try {
      user = await this.verificateToken(recoveryUpdateDataDTO.token);
    } catch (error) {
      return this.responseBadRequest(error);
    }

    //Update password in user
    //Update in external auth server
    let adminToken;
    try {
      adminToken = await this.externalAuthService.getAdminToken();
    } catch (error) {
      return {
        isSuccess: false,
        status: ResponseCode.INTERNAL_SERVER_ERROR,
        message: await this.i18n.translate('auth.ERROR.COULD_NOT_GET_ADMIN_TOKEN',),
        data: {},
        error: error
      };
    }
    const newPassword = recoveryUpdateDataDTO.password;
    const updetedAuthUser: IServiceResponse = await this.externalAuthService.resetPassword(user.authId, newPassword, adminToken);
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
      this.sendSuccessfulRecoveryEmail(user.firstName, user.email, lang);
    } catch (error) {
      //Could not be notified about changed password 
      console.log(error);
    }

    return updetedAuthUser;
  };

  /**
 * send email to notificate successful recovery
 * @param name 
 * @param email 
 * @returns 
 */
  private async sendSuccessfulRecoveryEmail(name: string, email: string, lang: string): Promise<any> {

    try {
      //set params to email template
      const params = { name: name, company: this.globalConfig.get<string>('COMPANY_NAME') };
      //Send email
      const subject: string = await this.i18n.translate('auth.RECOVERY_END_EMAIL.SUBJECT',
        { args: { company: this.globalConfig.get<string>('COMPANY_NAME') }, });

      const emailResponse: any = this.sender.sendEmailWithTemplate(subject, email, "recovery-end", params, lang);
      return emailResponse;
    } catch (error) {
      throw error;
    };
  };

  /**
   * Verify that the token sent by user is the same as the one saved in the database,
   * for the user with the email encoded within the token.
   * @param token 
   * @returns 
   */
  private async verificateToken(token: string): Promise<IUser> {

    //Validate if token exist
    if (!token) throw Error(await this.i18n.translate('auth.ERROR.INVALID_VERIFICATION_CODE_PARAM',));

    const partsArray = decodeToken(token);
    const decodedEmail = partsArray[0];
    const decodedCode = partsArray[1];

    //Validate email
    if (!validEmail(decodedEmail)) throw Error(await this.i18n.translate('auth.ERROR.INVALID_EMAIL',));

    //Verificate code
    let user: IUser = await this.userService.getByQuery({
      userName: decodedEmail,
      verificationCode: decodedCode,
    });

    if (user == null) {
      throw Error(await this.i18n.translate('auth.ERROR.INVALID_VERIFICATION_CODE',));
    }

    //Validate if expired time
    const dateOfProcessStarted: Date = new Date(user.startVerificationCode);
    const expirationDaysLimit: number = this.globalConfig.get<number>('EXPIRATION_DAYS_LIMIT');

    if (this.isDateExpired(dateOfProcessStarted, expirationDaysLimit)) {
      throw Error(await this.i18n.translate('auth.ERROR.VERIFICATION_CODE_EXPIRED',));
    }

    return user;
  };

  /**
   * Validate if the number of days expired. Is the date expired?
   * Receive a date and calculate if the number of days until today exceeds the number of expiration deadlines (daysLimit)
   * @param date 
   * @param days 
   * @returns 
   */
  private isDateExpired(date: Date, daysLimit: number): boolean {
    const todate = new Date(); //Now time
    const difference_ms = todate.getTime() - date.getTime();
    const difference_days = Math.round(difference_ms / 86400000); //number of days until today
    return difference_days > daysLimit;
  };

  /**
   * Create IServiceResponse object with BAD_REQUEST error
   * @param error 
   * @returns IServiceResponse object with BAD_REQUEST error
   */
  private responseBadRequest(error: any): IServiceResponse {
    //console.log(error);
    const authResponse: IServiceResponse = {
      isSuccess: false,
      status: ResponseCode.BAD_REQUEST, //BAD_REQUEST
      message: error.message,
      data: {},
      error: error
    };
    return authResponse;
  };

  /**
   * Create IServiceResponse object with INTERNAL_SERVER_ERROR 
   * @param error 
   * @returns IServiceResponse object with INTERNAL_SERVER_ERROR
   */
  private responseInternalError(error: any): IServiceResponse {
    //console.log(error);
    const authResponse: IServiceResponse = {
      isSuccess: false,
      status: ResponseCode.INTERNAL_SERVER_ERROR,
      message: error.message,
      data: {},
      error: error
    };
    return authResponse;
  };

};
