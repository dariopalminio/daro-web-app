import { Tokens } from 'domain/model/auth/tokens.type';

//Interface to do dependency inversion
export interface IAuthClient {

  register(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string): Promise<any>;

  sendStartEmailConfirm: (
    name: string,
    email: string,
    verificationPageLink: string,
    lang: string
  ) => Promise<any>;

  confirmAccount: (
    token: string,
    lang: string
  ) => Promise<any>;

  loginService (username: string, pass: string): Promise<Tokens>;

  logoutService: (userId: string) => Promise<number>;
  
  sendEmailToRecoveryPass: (
    email: string,
    recoveryPageLink: string,
    lang: string
  ) => Promise<any>;

  updatePassword: (
    token: string,
    password: string,
    lang: string
  ) => Promise<any>;

};