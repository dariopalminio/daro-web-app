
import  AuthApiClientImpl from './AuthApiClientImpl';
import  AuthApiOkFakeServiceImpl from './fake/AuthApiOkFakeClientImpl';
import { IAuthClient } from '../../../state/client/IAuthClient';

/**
 * Factory of IAuthService implementation for dependency injection
 */
export class AuthClientFactory {
    static create(fake: boolean): IAuthClient{
        //Return a factory function
        if (fake) return AuthApiOkFakeServiceImpl(); //Fake for testing
        return AuthApiClientImpl(); // Real API
    }
};
