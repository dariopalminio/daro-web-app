
import  AuthApiClientImpl from '../auth.api.client.impl';
import  AuthApiClienOkStub from '../stub/auth.api.client.ok.stub';
import { IAuthService } from '../../../domain/service/auth.service.interface';

/**
 * Factory of IAuthService implementation for dependency injection
 */
export class AuthApiClientFactory {
    static create(fake: boolean): IAuthService{
        //Return a factory function
        if (fake) return AuthApiClienOkStub(); //Fake for testing
        return AuthApiClientImpl(); // Real API
    }
};
