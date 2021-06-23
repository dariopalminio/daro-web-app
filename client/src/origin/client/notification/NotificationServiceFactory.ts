
import  NotificationApiServiceImpl from './NotificationApiServiceImpl';
import  NotificationFakeServiceImpl from './NotificationFakeServiceImpl';
import { INotificationService } from '../../../state/client/INotificationService';

/**
 * Factory of INotificationService implementation for dependency injection
 */
export class NotificationServiceFactory {
    static create(fake: boolean): INotificationService{
        //Return a factory function
        if (fake) return NotificationFakeServiceImpl(); //fake for test
        return NotificationApiServiceImpl(); //Real api
    }
};
