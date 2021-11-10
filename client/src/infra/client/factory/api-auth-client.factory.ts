import  ApiAuthClientImpl from '../api-auth-client.impl';
//import  AuthApiClienOkStub from '../stub/auth-api-client-ok.stub';
import { IAuthClient } from '../../../domain/service/auth-client.interface';

/**
 * Factory of IAuthService implementation for dependency injection
 */
export class ApiAuthClientFactory {
    static create(fake: boolean): IAuthClient{
        //Return a factory function
        if (fake) return ApiAuthClientImpl(); //Fake for testing
        return ApiAuthClientImpl(); // Real API
    }
};

