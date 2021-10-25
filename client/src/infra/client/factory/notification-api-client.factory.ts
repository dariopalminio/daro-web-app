
import  NotificationApiServiceImpl from '../notification-api-client.impl';
import  NotificationClientStub from '../stub/notification-api-client.stub';
import { INotificationClient } from '../../../domain/service/notification-client.interface';

/**
 * Factory of INotificationService implementation for dependency injection
 */
export class NotificationApiClientFactory {
    static create(fake: boolean): INotificationClient{
        //Return a factory function
        if (fake) return NotificationClientStub(); //fake for test
        return NotificationApiServiceImpl(); //Real api
    }
};
