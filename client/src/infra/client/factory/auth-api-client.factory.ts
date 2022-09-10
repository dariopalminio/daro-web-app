

import  AuthApiClienOkStub from '../stub/auth-api-client-ok.stub';
import { IAuthTokensClient } from '../../../domain/service/auth-tokens-client.interface';
import AuthKeycloakTokensClientImpl from '../auth-keycloak-tokens-client.impl';

/**
 * Factory of IAuthService implementation for dependency injection
 */
export class AuthApiClientFactory {
    static create(fake: boolean): IAuthTokensClient{
        //Return a factory function
        if (fake) return AuthApiClienOkStub(); //Fake for testing
        return AuthKeycloakTokensClientImpl(); // Real API
    }
};
