
import  NotificationApiServiceImpl from '../notification.api.client.impl';
import  NotificationClientMock from '../mock/notification.api.client.mock';
import { INotificationService } from '../../../domain/service/notification.service.interface';

/**
 * Factory of INotificationService implementation for dependency injection
 */
export class NotificationApiClientFactory {
    static create(fake: boolean): INotificationService{
        //Return a factory function
        if (fake) return NotificationClientMock(); //fake for test
        return NotificationApiServiceImpl(); //Real api
    }
};
