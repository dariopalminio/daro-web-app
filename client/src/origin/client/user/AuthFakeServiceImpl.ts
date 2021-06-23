import { IAuthService } from '../../../state/client/IAuthService';


// Fake factory function
export default function AuthFakeServiceImpl(): IAuthService {

// Fake function
  function getAdminTokenService(): Promise<string> {
    return new Promise<string>( (resolve, reject) => {
        const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw';
           resolve(jwt);
     });
  };

// Fake function
  function getAppTokenService(): Promise<string> {
    return new Promise<string>( (resolve, reject) => {
        const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw';
           resolve(jwt);
     });
  };

// Fake function
  function loginService(username: string, pass: string): Promise<string> {
    return new Promise<string>( (resolve, reject) => {
        const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw';
           resolve(jwt);
     });
  };

// Fake function
  function logoutService(userId: string, adminToken: string): Promise<number> {
    return new Promise<number>( (resolve, reject) => {
           resolve(200);
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
               resolve(200);
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
