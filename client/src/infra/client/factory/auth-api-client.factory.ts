
import  AuthApiClientImpl from '../auth-api-client.impl';
import  AuthApiClienOkStub from '../stub/auth-api-client-ok.stub';
import { IAuthClient } from '../../../domain/service/auth-client.interface';

/**
 * Factory of IAuthService implementation for dependency injection
 */
export class AuthApiClientFactory {
    static create(fake: boolean): IAuthClient{
        //Return a factory function
        if (fake) return AuthApiClienOkStub(); //Fake for testing
        return AuthApiClientImpl(); // Real API
    }
};
