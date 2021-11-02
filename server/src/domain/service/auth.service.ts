import { Injectable, Inject } from '@nestjs/common';
import { IAuthService } from '../input/port/auth.service.interface';
import { IAuth } from '../../domain/output/port/auth.interface';
import { UserRegisterDataDTO } from '../../domain/model/register/user-register-data.dto.type';

export const AUTH_IMPL_TOKEN = 'Auth_Implementation'; //Implementation Token

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(AUTH_IMPL_TOKEN)
    private readonly authService: IAuth) {
  }


  async register(userRegisterData: UserRegisterDataDTO): Promise<any> {

    const adminToken = await this.authService.getAdminToken();


    const resp = await this.authService.register(userRegisterData.firstName, userRegisterData.lastName, userRegisterData.email,
      userRegisterData.password, adminToken);


    const userAuth = await this.authService.getUserInfoByAdmin(userRegisterData.email, adminToken);

    if (userAuth) {
      const { id } = userAuth;
      console.log("userAuth:", userAuth);
      console.log("userAuth.id:", id);
    }

    return resp;

  };

};
