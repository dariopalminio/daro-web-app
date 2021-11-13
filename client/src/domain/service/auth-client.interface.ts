import { Tokens } from '../model/user/tokens.type';

//Interface to do dependency inversion
export interface IAuthClient {

  register(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    adminToken: string): Promise<any>;

  sendStartEmailConfirm: (
    name: string,
    email: string,
    verificationPageLink: string,
    locale: string,
    accessToken: string
  ) => Promise<any>;

  confirmAccount: (
    token: string,
    adminToken: string
  ) => Promise<any>;

  loginService (username: string, pass: string): Promise<Tokens>;

  logoutService: (userId: string, adminToken: string) => Promise<number>;
  
  sendEmailToRecoveryPass: (
    email: string,
    recoveryPageLink: string,
    accessToken: string
  ) => Promise<any>;

  updatePassword: (
    token: string,
    password: string,
    adminToken: string
  ) => Promise<any>;

};