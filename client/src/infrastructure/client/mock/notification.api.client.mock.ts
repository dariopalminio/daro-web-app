import { ContactType } from '../../../domain/model/notification/contact.type';
import { INotificationService } from '../../../domain/service/notification.service.interface';


export default function NotificationClientMock(): INotificationService {

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
