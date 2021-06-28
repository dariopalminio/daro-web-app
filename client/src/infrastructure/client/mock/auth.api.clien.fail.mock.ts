import { IAuthService } from '../../../domain/service/auth.service.interface';


// Fake factory function
export default function AuthApiClientFailMock(): IAuthService {

// Fake function
  function getAdminTokenService(): Promise<string> {
    return new Promise<string>( (resolve, reject) => {
      reject(new Error("General error!"));
     });
  };

// Fake function
  function getAppTokenService(): Promise<string> {
    return new Promise<string>( (resolve, reject) => {
      reject(new Error("General error!"));
     });
  };

// Fake function
  function loginService(username: string, pass: string): Promise<string> {
    return new Promise<string>( (resolve, reject) => {
      reject(new Error("General error!"));
     });
  };

// Fake function
  function logoutService(userId: string, adminToken: string): Promise<number> {
    return new Promise<number>( (resolve, reject) => {
      reject(new Error("General error!"));
     });
  };

// Fake function
  function registerService(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    adminToken: string): Promise<number> {
        return new Promise<number>( (resolve, reject) => {
          reject(new Error("General error!"));
         });
      };

  return {
    getAdminTokenService,
    getAppTokenService,
    loginService,
    logoutService,
    registerService,
  };
};
