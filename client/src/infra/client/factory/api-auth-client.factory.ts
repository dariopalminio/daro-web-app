import  ApiAuthClientImpl from '../api-auth-client.impl';
//import  AuthApiClienOkStub from '../stub/auth-api-client-ok.stub';
import { IAuthClient } from '../../../domain/service/auth-client.interface';
import ApiAuthClientStub from '../stub/api-auth-client.stub';

/**
 * Factory of IAuthService implementation for dependency injection
 */
export class ApiAuthClientFactory {
    static create(fake: boolean): IAuthClient{
        //Return a factory function
        if (fake) return ApiAuthClientStub(); //Fake for testing
        return ApiAuthClientImpl(); // Real API
    }
};

