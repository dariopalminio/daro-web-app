

//Interface to do dependency inversion
export interface IAuthClient {
  getAdminTokenService: () => Promise<string>;
  getAppTokenService: () => Promise<string>;
  loginService: (username: string, pass: string) => Promise<string>;
  logoutService: (userId: string, adminToken: string) => Promise<number>;
  registerService: (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    adminToken: string) => Promise<number>;
  };