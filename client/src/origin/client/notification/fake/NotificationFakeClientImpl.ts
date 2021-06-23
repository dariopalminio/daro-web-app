import { ContactType } from '../../../../state/model/notification/ContactType';
import { INotificationClient } from '../../../../state/client/INotificationClient';


export default function NotificationFakeServiceImpl(): INotificationClient {

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
