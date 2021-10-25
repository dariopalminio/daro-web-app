


import  UserApiClientImpl from '../user-api-client.impl';
//import  AuthApiClienOkStub from '../stub/auth-api-client-ok.stub';
import { IUserClient } from '../../../domain/service/user-client.interface';

/**
 * Factory of IAuthService implementation for dependency injection
 */
export class UserApiClientFactory {
    static create(fake: boolean): IUserClient{
        //Return a factory function
        if (fake) return UserApiClientImpl(); //Fake for testing
        return UserApiClientImpl(); // Real API
    }
};

