

//Interface to do dependency inversion
export interface IAuthService {
  getAdminTokenService: () => Promise<any>;
  getAppTokenService: () => Promise<any>;
  loginService: (username: string, pass: string) => Promise<any>;
  logoutService: (userId: string, adminToken: string) => Promise<any>;
  registerService: (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    adminToken: string) => Promise<any>;
  };