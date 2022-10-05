import { Injectable, Inject } from '@nestjs/common';
import { IAuth } from '../output-port/auth.interface';
import IEmailSender from '../output-port/email-sender.interface';
import { LoginFormDTO } from 'src/domain/model/auth/login/login-form.dto';
import { ITranslator } from 'src/domain/output-port/translator.interface';
import { ResponseCode } from 'src/domain/model/service/response.code.enum';
import { IGlobalConfig } from 'src/domain/output-port/global-config.interface';
import { LoginFormDTOValidator } from 'src/domain/validator/login-form-dto.validator';
import { DomainError } from 'src/domain/error/domain-error';
import { IAuthTokensService } from './interface/auth.tokens.service.interface';
import { TokensDTO } from 'src/domain/model/auth/token/tokens.dto';
import jwt from "jsonwebtoken";
import { AuthClientDTO } from '../model/auth/token/auth.client.dto';
import { RequestRefreshToken } from '../model/auth/token/auth.request.refresh.token.dto';
import { NewAdminTokenRequestType } from '../model/auth/token/auth.admin.dto';
import { PayloadType } from '../model/auth/token/payload.type';
import { IUserService } from './interface/user.service.interface';
import { IUser } from '../model/user/user.interface';
const bcrypt = require('bcrypt');

/**
 * Authorization Tokens service
 */
@Injectable()
export class AuthTokensService implements IAuthTokensService {

  constructor(
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

  async test() {

        // Encrypt hash of password
        const salt = await bcrypt.genSalt(10);
        const passwordCrypted: string = await bcrypt.hash('12345Qwert', salt);
        console.log('12345Qwert = ', passwordCrypted);

  }
  /**
   * Create access and refresh tokens using payload data input
   * @param payload profile data
   * @returns 
   */
  createTokens(payload: PayloadType, accessExpiresIn: number, refreshExpireIn: number): TokensDTO {

    let tokens: TokensDTO = {
      access_token: "",
      expires_in: 0,
      refresh_expires_in: 0,
      refresh_token: "",
      token_type: "Bearer",
      "not-before-policy": 0,
      session_state: "",
      scope: "profile email"
    };

    const privateKEY: string = this.getPrivateKey();

    const issuer = 'Dario Palminio';
    const subject = payload.id;
    const audience = 'Dario Palminio';

    const accessSignOptions: any = {
      issuer: issuer,
      subject: subject,
      audience: audience,
      expiresIn: accessExpiresIn,
      algorithm: "RS256"
    };

    // Create a access token
    tokens.access_token = jwt.sign(payload, privateKEY, accessSignOptions);
    tokens.expires_in = accessSignOptions.expiresIn;

    const refreshSignOptions: any = {
      issuer: issuer,
      subject: subject,
      audience: audience,
      expiresIn: refreshExpireIn, // 2 days
      algorithm: "RS256"
    };

    // Create a refresh token
    tokens.refresh_token = jwt.sign(payload, privateKEY, refreshSignOptions);
    tokens.refresh_expires_in = accessSignOptions.expiresIn;

    return tokens;
  };

  /**
  * Create the PEM string base64 decode with auth public key
  * @returns 
  */
  private getPrivateKey(): string {
    if (!this.globalConfig.get<string>('AUTH_PRIVATE_KEY') || this.globalConfig.get<string>('AUTH_PRIVATE_KEY') === '')
      throw Error("The public key is wrong!");
    let pem = '';
    pem += '-----BEGIN RSA PRIVATE KEY-----\n';
    pem += this.globalConfig.get<string>('AUTH_PRIVATE_KEY');
    pem += '\n';
    pem += '-----END RSA PRIVATE KEY-----\n';
    return pem;
  };

  getPEMPublicKey(): string {
    if (!this.globalConfig.get<string>('AUTH_PUBLIC_KEY') || this.globalConfig.get<string>('AUTH_PUBLIC_KEY') === '')
      throw Error("The public key is wrong!");
    let pem = '';
    pem += '-----BEGIN PUBLIC KEY-----\n';
    pem += this.globalConfig.get<string>('AUTH_PUBLIC_KEY');
    pem += '\n';
    pem += '-----END PUBLIC KEY-----\n';
    return pem;
  };

  verifyClient(clientId: string, clientSecret: string): boolean {
    if ((clientId !== this.globalConfig.get('Keycloak_client_id')) ||
      (clientSecret !== this.globalConfig.get('Keycloak_client_secret'))) return false;
    return true;
  };

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

    let user: IUser;
    try {
      user = await this.userService.getByQuery({ userName: loginForm.username });
    } catch (error) {
      if (error instanceof DomainError) throw error;
      throw new DomainError(ResponseCode.INTERNAL_SERVER_ERROR, error.message, { error: 'Cannot obtain user from data base!' });
    }
    if (!user)
      throw new DomainError(ResponseCode.UNAUTHORIZED, "User not found!", { error: "Unauthorized. User not found!" });

    const validPassword = await bcrypt.compare(loginForm.password, user.password);

    if (!validPassword)
      throw new DomainError(ResponseCode.UNAUTHORIZED, "User not found!", { error: "Unauthorized. Any data is invalid!" });

    const payload: PayloadType = {
      id: user._id,
      typ: "Bearer",
      roles: user.roles,
      email_verified: user.verified,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.userName,
      email: user.email
    };

    const tokens: TokensDTO = this.createTokens(payload, 86400, 86400 * 2);

    return tokens;
  };

  /**
    * Get a admin access token (from auth server) for next time can create user or update user.
    */
  async getAdminToken(body: NewAdminTokenRequestType): Promise<any> {

    //grant_type=password
    const isClient: boolean = this.verifyClient(body.client_id, body.client_secret);
    if (!isClient)
      throw new DomainError(ResponseCode.UNAUTHORIZED, "Is not a client!", { error: "Unauthorized. Client id or client secret are invalid!" });

    let user: IUser;
    try {
      user = await this.userService.getByQuery({ userName: body.username });
    } catch (error) {
      if (error instanceof DomainError) throw error;
      throw new DomainError(ResponseCode.INTERNAL_SERVER_ERROR, error.message, { error: 'Cannot obtain user from data base!' });
    }
    if (!user)
      throw new DomainError(ResponseCode.UNAUTHORIZED, "User not found!", { error: "Unauthorized. User not found!" });

    const validPassword = await bcrypt.compare(body.password, user.password);

    if (!validPassword)
      throw new DomainError(ResponseCode.UNAUTHORIZED, "User not found!", { error: "Unauthorized. Any data is invalid!" });

    if (!user.roles.includes("Admin"))
      throw new DomainError(ResponseCode.UNAUTHORIZED, "User is not Admin!", { error: "Unauthorized!" });

    const payload: PayloadType = {
      id: user._id,
      typ: "Bearer",
      roles: user.roles,
      email_verified: user.verified,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.userName,
      email: user.email
    };

    const tokens: TokensDTO = this.createTokens(payload, 86400, 86400 * 2);

    return tokens;
  };

  /**
   * Obtain app accsess token from a service account
   */
  async getAppToken(authClientDTO: AuthClientDTO): Promise<any> {

    //grant_type=client_credentials
    try {
      if (!authClientDTO.client_id || !authClientDTO.client_secret || !authClientDTO.grant_type)
        throw new Error(await this.i18n.translate('auth.ERROR.INVALID_EMPTY_VALUE',));
    } catch (error) {
      throw new DomainError(ResponseCode.BAD_REQUEST, error.message, { error: error });
    };

    const isClient: boolean = this.verifyClient(authClientDTO.client_id, authClientDTO.client_secret);
    if (!isClient)
      throw new DomainError(ResponseCode.UNAUTHORIZED, "Is not a client!", { error: "Unauthorized. Client id and client secret are invalid!" });


    const payload: PayloadType = {
      id: authClientDTO.client_id,
      typ: "Bearer",
      roles: ["App", "Anonymous"],
      email_verified: true,
      firstName: "App",
      lastName: "App",
      username: authClientDTO.client_id,
      email: authClientDTO.client_id
    };

    const tokens: TokensDTO = this.createTokens(payload, 86400, 86400 * 2);

    return tokens;
  };

  /**
   * Get Refresh Token
   * 
   * getRefreshToken is used when you need to make the user keep login in the system 
   * if the user's access_token get expired and user want to keep login. How can I get newly 
   * updated access_token with this function.
   */
  async getRefreshToken(body: RequestRefreshToken): Promise<any> {

    try {
      if (!body)
        throw new Error(await this.i18n.translate('auth.ERROR.INVALID_EMPTY_VALUE',));
    } catch (error) {
      throw new DomainError(ResponseCode.BAD_REQUEST, error.message, { error: error });
    };


    const isClient: boolean = this.verifyClient(body.client_id, body.client_secret);
    if (!isClient)
      throw new DomainError(ResponseCode.UNAUTHORIZED, "Is not a client!", { error: "Unauthorized. Client id and client secret are invalid!" });
    let payload: PayloadType;

    try {
      const jwtDecoded = jwt.decode(body.refresh_token);

      payload = {
        id: jwtDecoded.id,
        typ: "Bearer",
        roles: ["App", "Anonymous"],
        email_verified: jwtDecoded.email_verified,
        firstName: jwtDecoded.firstName,
        lastName: jwtDecoded.lastName,
        username: jwtDecoded.username,
        email: jwtDecoded.email
      };
    } catch (error) {
      throw new DomainError(ResponseCode.BAD_REQUEST, error.message, { error: "Refresh token malformed!" });
    };

    const tokens: TokensDTO = this.createTokens(payload, 86400, 86400 * 2);

    return tokens;
  };


};