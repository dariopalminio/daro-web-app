import { Tokens } from '../model/auth/tokens.type';

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
    lang: string,
    accessToken: string
  ) => Promise<any>;

  confirmAccount: (
    token: string,
    lang: string,
    adminToken: string
  ) => Promise<any>;

  loginService (username: string, pass: string): Promise<Tokens>;

  logoutService: (userId: string, adminToken: string) => Promise<number>;
  
  sendEmailToRecoveryPass: (
    email: string,
    recoveryPageLink: string,
    lang: string,
    adminToken: string
  ) => Promise<any>;

  updatePassword: (
    token: string,
    password: string,
    lang: string,
    adminToken: string
  ) => Promise<any>;

};