//Interface to do dependency inversion
export interface IUserClient {

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
    accessToken: string
  ) => Promise<any>;

  isVerificationCodeOk: (
    token: string,
    adminToken: string
  ) => Promise<any>;


};