
import { LoginFormDTO } from '../../model/auth/login/login-form.dto';
import { AuthClientDTO } from 'src/domain/model/auth/token/auth.client.dto';
import { RequesRefreshToken } from 'src/domain/model/auth/token/auth.request.refresh.token.dto';

export interface IAuthTokensService {
    
    login(loginForm: LoginFormDTO): Promise<any>;
    getAppToken(authClientDTO: AuthClientDTO): Promise<any>;
    getAdminToken(body: NewAdminTokenRequestType): Promise<any>;
    getRefreshToken(body: RequesRefreshToken): Promise<any>;

};