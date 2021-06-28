
import  AuthApiClientImpl from '../auth.api.client.impl';
import  AuthApiClienOkMock from '../mock/auth.api.clien.ok.mock';
import { IAuthService } from '../../../domain/service/auth.service.interface';

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
