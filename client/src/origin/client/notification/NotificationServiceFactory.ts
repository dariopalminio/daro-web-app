
import  NotificationServiceApiImpl from './NotificationServiceApiImpl';
import { INotificationService } from '../../../state/client/INotificationService';

/**
 * Factory of UserValidation implementation for dependency injection
 */
export class NotificationServiceFactory {
    static create(): INotificationService{
        return NotificationServiceApiImpl();
    }
};
