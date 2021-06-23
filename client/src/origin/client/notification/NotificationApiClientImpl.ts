
import * as OriginConfig from '../../OriginConfig';
import axios, { AxiosPromise } from 'axios';
import { handleAxiosError, ApiError } from '../ApiError';
import { ContactType } from '../../../state/model/notification/ContactType';
import { INotificationClient } from '../../../state/client/INotificationClient';

/**
 * NotificationApiService implementation 
 * Service as factory function that return an interface.
 * A factory function is any function which is not a class or constructor that returns 
 * a (presumably new) object. In JavaScript, any function can return an object.
 * @returns 
 */
export default function NotificationApiClientImpl(): INotificationClient {

/**
 * Send Contact Email using notification service.
 * 
 * @param contactData ContactType
 * @param token Valid access token
 * @returns any
 */
function sendContactEmailService(contactData: ContactType, token: string): Promise<any>{

  //Notification endpoint
  const URL = OriginConfig.URLPath.notifications;

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
    const info: Promise<any> = promise.then((response) => response.data).catch((error) =>{

      const authError: ApiError = handleAxiosError(error);
      throw authError;
    });

    return info;
};

return {
  sendContactEmailService,
};
};
