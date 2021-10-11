
import  NotificationApiServiceImpl from '../notification-api-client.impl';
import  NotificationClientStub from '../stub/notification-api-client.stub';
import { INotificationService } from '../../../domain/service/notification-service.interface';

/**
 * Factory of INotificationService implementation for dependency injection
 */
export class NotificationApiClientFactory {
    static create(fake: boolean): INotificationService{
        //Return a factory function
        if (fake) return NotificationClientStub(); //fake for test
        return NotificationApiServiceImpl(); //Real api
    }
};
