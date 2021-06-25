
import  NotificationApiServiceImpl from '../NotificationApiClientImpl';
import  NotificationClientMock from '../mock/NotificationClientMock';
import { INotificationClient } from '../../../domain/service/INotificationClient';

/**
 * Factory of INotificationService implementation for dependency injection
 */
export class NotificationApiClientFactory {
    static create(fake: boolean): INotificationClient{
        //Return a factory function
        if (fake) return NotificationClientMock(); //fake for test
        return NotificationApiServiceImpl(); //Real api
    }
};
