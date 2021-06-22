
import * as GlobalConfig from '../../config/GlobalConfig';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { handleAxiosError, AuthError } from '../AuthError';
import { ContactType } from '../../../state/model/notification/ContactType';
import { INotificationService } from '../../../state/client/INotificationService';


//Service as factory function that return an interface
export default function NotificationServiceApiImpl(): INotificationService {

/**
 * Send Contact Email using notification service.
 * 
 * @param contactData ContactType
 * @param token Valid access token
 * @returns any
 */
function sendContactEmailService(contactData: ContactType, token: string): Promise<any>{

  //Notification endpoint
  const URL = GlobalConfig.URLPath.notifications;

  //try {
    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type':  `application/json`,},
      data: contactData
    });
    // using .then, create a new promise which extracts the data
    const info = promise.then((response) => response.data).catch((error) =>{
      console.log(error.message);
      const authError: AuthError = handleAxiosError(error);
      throw authError;
    });

    return info;
};

return {
  sendContactEmailService,
};
};
