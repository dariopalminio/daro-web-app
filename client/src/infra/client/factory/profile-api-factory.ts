
import { IProfileClient } from '../../../domain/service/profile-client.interface';
import ProfileApiClientImpl from '../profile-api-client.impl';
import ProfileClientStub from '../stub/profile-api-client.stub';

/**
 * Factory of INotificationService implementation for dependency injection
 */
export class ProfileApiClientFactory {
    static create(fake: boolean): IProfileClient{
        //Return a factory function
        if (fake) return ProfileClientStub(); //fake for test
        return ProfileApiClientImpl(); //Real api
    }
};
