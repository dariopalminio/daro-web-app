import { IAuthResponse } from '../../model/auth/auth-response.interface';
  
export interface IAuth {

    getAdminToken(): Promise<string>;

    register(
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        adminToken: string): Promise<IAuthResponse>;
    
    getUserInfoByAdmin(username: string, adminToken: string): Promise<any | undefined>;
    
    deleteAuthUser(authId: string, accessToken: string): Promise<IAuthResponse>;

    confirmEmail(userId: string, userEmail: string, adminToken: string): Promise<IAuthResponse>;

    login(username: string, pass: string): Promise<IAuthResponse>;

    logout(userId: string, accessToken: string): Promise<IAuthResponse>;

  }