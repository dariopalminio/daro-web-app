


import  UserApiClientImpl from '../user-api-client.impl';
//import  AuthApiClienOkStub from '../stub/auth-api-client-ok.stub';
import { IUserService } from '../../../domain/service/user-service.interface';

/**
 * Factory of IAuthService implementation for dependency injection
 */
export class UserApiClientFactory {
    static create(fake: boolean): IUserService{
        //Return a factory function
        if (fake) return UserApiClientImpl(); //Fake for testing
        return UserApiClientImpl(); // Real API
    }
};

