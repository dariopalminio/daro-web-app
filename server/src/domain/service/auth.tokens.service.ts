import { Injectable, Inject } from '@nestjs/common';
import { IAuth } from '../output-port/auth.interface';
import IEmailSender from '../output-port/email-sender.interface';
import { IServiceResponse } from '../../domain/model/service/service-response.interface';
import { LoginFormDTO } from '../../domain/model/auth/login/login-form.dto';
import { ITranslator } from '../../domain/output-port/translator.interface';
import { ResponseCode } from '../../domain/model/service/response.code.enum';
import { IGlobalConfig } from '../../domain/output-port/global-config.interface';
import { LoginFormDTOValidator } from '../../domain/validator/login-form-dto.validator';
import { DomainError } from '../../domain/error/domain-error';
import { AuthClientDTO } from '../model/auth/token/auth.client.dto';
import { RequesRefreshToken } from '../model/auth/token/auth.request.refresh.token.dto';
import { IAuthTokensService } from './interface/auth.tokens.service.interface';

/**
 * Authorization Tokens service
 */
@Injectable()
export class AuthTokensService implements IAuthTokensService {

  constructor(
    @Inject('IAuth')
    private readonly externalAuthService: IAuth,
    @Inject('IEmailSender')
    readonly sender: IEmailSender,
    @Inject('ITranslator')
    private readonly i18n: ITranslator,
    @Inject('IGlobalConfig')
    private readonly globalConfig: IGlobalConfig,
  ) {
  }

  /**
   * login
   * @param loginForm 
   * @returns 
   */
  async login(loginForm: LoginFormDTO): Promise<any> {


    // Validate login form (error BadRequestException)

    let loginFormDTOValidator = new LoginFormDTOValidator();
    if (!loginFormDTOValidator.validate(loginForm)) {
      const msg = await loginFormDTOValidator.traslateValidateErrorsText(this.i18n);
      // Error BadRequestException
      throw new DomainError(ResponseCode.BAD_REQUEST, msg, {});
    };

    // TODO: Validate if user is disabled by 3 consecutive failed login attempts
    let loginAuthResp;
    try {
      loginAuthResp = await this.externalAuthService.login(loginForm.username, loginForm.password);
    } catch (error) {
      if (error instanceof DomainError) throw error;
      throw new DomainError(ResponseCode.INTERNAL_SERVER_ERROR, error.message, {});
    }

    //if (!loginAuthResp.isSuccess) { //failed login attempt
    // TODO: Save failed login attempt
    // TODO: Disable user account after 3 consecutive failed login attempts
    //}

    return loginAuthResp;
  };


  async getAdminToken(body: NewAdminTokenRequestType): Promise<any> {

    let data = await this.externalAuthService.getAdminToken(body);
    console.log('service.getAdminToken.data',data);
    console.log('data', data);
    if (data == undefined) 
      throw new DomainError(ResponseCode.INTERNAL_SERVER_ERROR, "Token data undefined. Can not obtain token.", {});

    return data;
  };


  async getAppToken(authClientDTO: AuthClientDTO): Promise<any> {

    try {
      if (!authClientDTO.client_id || !authClientDTO.client_secret || !authClientDTO.grant_type)
        throw new Error(await this.i18n.translate('auth.ERROR.INVALID_EMPTY_VALUE',));
    } catch (error) {
      throw new DomainError(ResponseCode.BAD_REQUEST, error.message, { error: error });
    };



    let data = await this.externalAuthService.getAppToken(authClientDTO);
    console.log('token', data);
    if (data == undefined) throw new DomainError(ResponseCode.INTERNAL_SERVER_ERROR, "Token data undefined. Can not obtain token.", {});

    return data;
  };

  async getRefreshToken(body: RequesRefreshToken): Promise<any> {

    try {
      if (!body)
        throw new Error(await this.i18n.translate('auth.ERROR.INVALID_EMPTY_VALUE',));
    } catch (error) {
      throw new DomainError(ResponseCode.BAD_REQUEST, error.message, { error: error });
    };

    let data = await this.externalAuthService.getRefreshToken(body);

    if (data == undefined) throw new DomainError(ResponseCode.INTERNAL_SERVER_ERROR, "Token data undefined. Can not obtain token.", {});

    return data;
  };


};