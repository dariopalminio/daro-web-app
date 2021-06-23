
import  NotificationApiServiceImpl from './NotificationApiClientImpl';
import  NotificationFakeServiceImpl from './fake/NotificationFakeClientImpl';
import { INotificationClient } from '../../../state/client/INotificationClient';

/**
 * Factory of INotificationService implementation for dependency injection
 */
export class NotificationApiClientFactory {
    static create(fake: boolean): INotificationClient{
        //Return a factory function
        if (fake) return NotificationFakeServiceImpl(); //fake for test
        return NotificationApiServiceImpl(); //Real api
    }
};
