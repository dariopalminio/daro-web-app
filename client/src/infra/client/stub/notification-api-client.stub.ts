import { ContactType } from '../../../domain/model/notification/contact.type';
import { INotificationClient } from '../../../domain/service/notification-client.interface';
import { SessionType } from '../../../domain/model/user/session.type';

export default function NotificationClientStub(): INotificationClient {

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
