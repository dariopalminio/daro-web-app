
import * as InfraConfig from '../infrastructure.config';
import axios, { AxiosPromise } from 'axios';
import { handleAxiosError, ApiError, AuthStatusEnum } from './api.error';
import { ContactType } from '../../domain/model/notification/contact.type';
import { INotificationClient } from '../../domain/service/notification-client.interface';


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
  function sendContactEmailService(contactData: ContactType, accessToken: string ): Promise<any> {

    //Notification endpoint
    const URL = `${InfraConfig.APIEndpoints.notifications}/sendContactEmail`;

    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': `application/json`,
      },
      data: contactData
    });

    // Using .then, create a new promise which extracts the data
    const info: Promise<any> = promise
      .then((response) => response.data)
      .catch((error) => {
        const authError: ApiError = handleAxiosError(error);
        if (authError.status === AuthStatusEnum.UNAUTHORIZED ){
          console.log("sendContactEmailService-->UNAUTHORIZED!!!");
          throw authError;
        }else{
          console.log("sendContactEmailService-->throw authError!!!");
          authError.message = "Can not send email. ";
          throw authError;
        };
      });

      console.log(info);
      
    return info;
  };

  return {
    sendContactEmailService
  };
};
