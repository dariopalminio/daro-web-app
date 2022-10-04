import { Tokens } from 'domain/model/auth/tokens.type';

//Interface to do dependency inversion
export interface IAuthTokensClient {
  getAdminTokenService: () => Promise<string>;
  getAppTokenService: () => Promise<string>;
  getRefreshTokenService: (refreshToken: string) => Promise<any>;
  /*
  loginInAuthServer: (username: string, pass: string) => Promise<Tokens>;
  logoutService: (userId: string, adminToken: string) => Promise<number>;
  registerService: (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    adminToken: string) => Promise<number>;
    */
  //getUserByEmailService(userEmail: string, adminToken: string): Promise<any>;
  //confirmEmailService: (userId: string, userEmail: string, adminToken: string) => Promise<number>;
  };