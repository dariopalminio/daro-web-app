
import { UserRegisterDataDTO } from '../../model/register/user-register-data.dto.type';

export interface IAuthService {

    register (userRegisterData: UserRegisterDataDTO): Promise<any>;

};