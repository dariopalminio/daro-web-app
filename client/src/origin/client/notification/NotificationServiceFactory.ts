
import  NotificationApiServiceImpl from './NotificationApiServiceImpl';
import { INotificationService } from '../../../state/client/INotificationService';

/**
 * Factory of INotificationService implementation for dependency injection
 */
export class NotificationServiceFactory {
    static create(): INotificationService{
        //Return a factory function
        return NotificationApiServiceImpl();
    }
};
