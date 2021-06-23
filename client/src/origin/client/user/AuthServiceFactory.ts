
import  AuthApiServiceImpl from './AuthApiServiceImpl';
import  AuthFakeServiceImpl from './AuthFakeServiceImpl';
import { IAuthService } from '../../../state/client/IAuthService';

/**
 * Factory of IAuthService implementation for dependency injection
 */
export class AuthServiceFactory {
    static create(fake: boolean): IAuthService{
        //Return a factory function
        if (fake) return AuthFakeServiceImpl(); //Fake for testing
        return AuthApiServiceImpl(); // Real API
    }
};
