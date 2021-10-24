import { ContactType } from '../../../domain/model/notification/contact.type';
import { INotificationService } from '../../../domain/service/notification-service.interface';
import { SessionType } from '../../../domain/model/user/session.type';

export default function NotificationClientStub(): INotificationService {

/**
 * Stub function
 */
function sendContactEmailService(contactData: ContactType, accessToken: string): Promise<any>{
    return new Promise<any>( (resolve, reject) => {
           const resp: any = {};
           resolve(resp);
     });
  };



return {
  sendContactEmailService,
};
};
