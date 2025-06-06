import { ContactType } from '../../../domain/model/notification/contact.type';
import { INotificationClient } from '../../../domain/service/notification-client.interface';

export default function NotificationClientStub(): INotificationClient {

/**
 * Stub function
 */
function sendContactEmailService(contactData: ContactType): Promise<any>{
    return new Promise<any>( (resolve, reject) => {
           const resp: any = {};
           resolve(resp);
     });
  };



return {
  sendContactEmailService,
};
};
