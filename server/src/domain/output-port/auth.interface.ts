import { AuthClientDTO } from '../model/auth/token/auth.client.dto';
import { RequesRefreshToken } from '../model/auth/token/auth.request.refresh.token.dto';
import { IServiceResponse } from '../model/service/service-response.interface';
  
export interface IAuth {

    getAdminToken(body: NewAdminTokenRequestType): Promise<any>;
    getAdminStringToken(): Promise<string>;
    getAppToken(authClientDTO: AuthClientDTO): Promise<any>;
    getRefreshToken(body: RequesRefreshToken): Promise<any>;

    register(
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        adminToken: string): Promise<IServiceResponse>;
    
    getUserInfoByAdmin(username: string, adminToken: string): Promise<IServiceResponse>;
    
    deleteAuthUser(authId: string, accessToken: string): Promise<IServiceResponse>;

    confirmEmail(userId: string, userEmail: string, adminToken: string): Promise<IServiceResponse>;

    login(username: string, pass: string): Promise<IServiceResponse>;

    logout(userId: string, accessToken: string): Promise<IServiceResponse>;

    resetPassword(
        userId: string,
        newPassword: string,
        adminToken: string
      ): Promise<IServiceResponse>;

  }