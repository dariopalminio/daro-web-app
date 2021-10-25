//Interface to do dependency inversion
export interface IUserClient {

  createUser: (
    authId: string,
    firstName: string,
    lastName: string,
    email: string,
    adminToken: string) => Promise<number>;

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