import { IAuthService, Tokens } from '../../../domain/service/auth-service.interface';



/**
 * Stub factory function
 * This simulates a AuthApiClient with ok responses
 * @returns 
 */
export default function AuthApiClienOkStub(): IAuthService {

// Stub function
  function getAdminTokenService(): Promise<string> {
    return new Promise<string>( (resolve, reject) => {
        const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw';
           resolve(jwt);
     });
  };

// Stub function
  function getAppTokenService(): Promise<string> {
    return new Promise<string>( (resolve, reject) => {
        const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw';
           resolve(jwt);
     });
  };

  // Stub function
  function getRefreshTokenService(refreshToken: string): Promise<Tokens> {
    return new Promise<Tokens>( (resolve, reject) => {
        const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw';
           resolve({
            access_token: jwt,
            refresh_token: jwt,
            expires_in: 60,
            refresh_expires_in: 10800,
            date: new Date()
          });
     });
  };

// Fake function
  function loginService(username: string, pass: string): Promise<Tokens> {
    return new Promise<Tokens>( (resolve, reject) => {
        const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw';
           
        resolve({access_token: jwt,
          refresh_token: jwt,
          expires_in: 60,
          refresh_expires_in: 10800,
          date: new Date()
        });
     });
  };

// Stub function
  function logoutService(userId: string, adminToken: string): Promise<number> {
    return new Promise<number>( (resolve, reject) => {
           resolve(200);
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
               resolve(200);
         });
      };

  // Stub function
  function getUserByEmailService(
  userEmail: string, adminToken: string): Promise<any> {
    return new Promise<any>( (resolve, reject) => {
      resolve({});
});
    };

  // Stub function
  function confirmEmailService(
    userId: string, 
    userEmail: string, 
    adminToken: string): Promise<number> {
        return new Promise<number>( (resolve, reject) => {
               resolve(200);
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
