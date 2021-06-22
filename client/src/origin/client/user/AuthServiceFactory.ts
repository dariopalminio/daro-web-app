
import  AuthApiServiceImpl from './AuthApiServiceImpl';
import { IAuthService } from '../../../state/client/IAuthService';

/**
 * Factory of IAuthService implementation for dependency injection
 */
export class AuthServiceFactory {
    static create(): IAuthService{
        //Return a factory function
        return AuthApiServiceImpl();
    }
};
