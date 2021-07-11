
//Auth tokens
export type Tokens = {
  access_token: string; //JWT
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  //token_type: string;
  //'not-before-policy': number;
  //session_state: string;
  //scope: string;
  date: Date;
};


//Interface to do dependency inversion
export interface IAuthService {
  getAdminTokenService: () => Promise<string>;
  getAppTokenService: () => Promise<string>;
  getRefreshTokenService: (refreshToken: string) => Promise<Tokens>;
  loginService: (username: string, pass: string) => Promise<Tokens>;
  logoutService: (userId: string, adminToken: string) => Promise<number>;
  registerService: (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    adminToken: string) => Promise<number>;
  };