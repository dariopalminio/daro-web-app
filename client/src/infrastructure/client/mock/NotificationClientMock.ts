import { ContactType } from '../../../domain/model/notification/ContactType';
import { INotificationClient } from '../../../domain/service/INotificationClient';


export default function NotificationClientMock(): INotificationClient {

/**
 * Fake function
 * @param contactData optional
 * @param token optional
 * @returns {}
 */
function sendContactEmailService(contactData: ContactType, token: string): Promise<any>{
    return new Promise<any>( (resolve, reject) => {
           const resp: any = {};
           resolve(resp);
     });
  };

return {
  sendContactEmailService,
};
};
