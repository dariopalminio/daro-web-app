import { ContactType } from '../../../state/model/notification/ContactType';
import { INotificationService } from '../../../state/client/INotificationService';


export default function NotificationFakeServiceImpl(): INotificationService {

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
