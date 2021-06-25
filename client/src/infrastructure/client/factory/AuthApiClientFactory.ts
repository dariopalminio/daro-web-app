
import  AuthApiClientImpl from '../AuthApiClientImpl';
import  AuthApiClienOkMock from '../mock/AuthApiClienOkMock';
import { IAuthService } from '../../../domain/service/IAuthService';

/**
 * Factory of IAuthService implementation for dependency injection
 */
export class AuthApiClientFactory {
    static create(fake: boolean): IAuthService{
        //Return a factory function
        if (fake) return AuthApiClienOkMock(); //Fake for testing
        return AuthApiClientImpl(); // Real API
    }
};
