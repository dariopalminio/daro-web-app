import { IAuthService, Tokens } from '../../../domain/service/auth-service.interface';


/**
 * Stub factory function
 * This simulates a AuthApiClient with fail responses
 * @returns 
 */
export default function AuthApiClientFailStub(): IAuthService {

// Stub function
  function getAdminTokenService(): Promise<string> {
    return new Promise<string>( (resolve, reject) => {
      reject(new Error("General error!"));
     });
  };

// Stub function
  function getAppTokenService(): Promise<string> {
    return new Promise<string>( (resolve, reject) => {
      reject(new Error("General error!"));
     });
  };

  // Stub function
  function getRefreshTokenService(refreshToken: string): Promise<Tokens> {
    return new Promise<Tokens>( (resolve, reject) => {
      reject(new Error("General error!"));
     });
  };

// Stub function
  function loginService(username: string, pass: string): Promise<Tokens> {
    return new Promise<Tokens>( (resolve, reject) => {
      reject(new Error("General error!"));
     });
  };

// Stub function
  function logoutService(userId: string, adminToken: string): Promise<number> {
    return new Promise<number>( (resolve, reject) => {
      reject(new Error("General error!"));
     });
  };

// Stub function
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

// Stub function
function getUserByEmailService(
    userEmail: string, adminToken: string): Promise<any> {
        return new Promise<any>( (resolve, reject) => {
          reject(new Error("General error!"));
         });
      };


// Stub function
  function confirmEmailService(
    userId: string, 
    userEmail: string, 
    adminToken: string): Promise<number> {
      return new Promise<number>( (resolve, reject) => {
        reject(new Error("General error!"));
       });
    };

  return {
    getAdminTokenService,
    getAppTokenService,
    getRefreshTokenService,
    loginService,
    logoutService,
    registerService,
    getUserByEmailService,
    confirmEmailService,
  };
};
