
import * as OriginConfig from '../infrastructure.config';
import axios, { AxiosPromise } from 'axios';
import { handleAxiosError, ApiError, AuthStatusEnum } from './api.client.error';
import { ContactType } from '../../domain/model/notification/contact.type';
import { INotificationService } from '../../domain/service/notification.service.interface';


/**
 * NotificationApiService implementation 
 * Service as factory function that return an interface.
 * A factory function is any function which is not a class or constructor that returns 
 * a (presumably new) object. In JavaScript, any function can return an object.
 * @returns 
 */
export default function NotificationApiClientImpl(): INotificationService {


  /**
   * Send Start Email confirmation with verification code to register process.
   * @param name 
   * @param email 
   * @param code 
   * @param accessToken 
   * @returns 
   */
  function sendStartEmailConfirm(
    name: string,
    email: string,
    verificationLink: string, 
    accessToken: string ): Promise<any> {

    //Notification endpoint
    const URL = `${OriginConfig.URLPath.notifications}/sendStartEmailConfirm`;

    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': `application/json`,
      },
      data: {
        'name': name,
        'email': email,
        'verificationLink': verificationLink,
      }
    });

    // Using .then, create a new promise which extracts the data
    const info: Promise<any> = promise
        .then((response) => response.data)
        .catch((error) => {
          const authError: ApiError = handleAxiosError(error);
          if (authError.status === AuthStatusEnum.UNAUTHORIZED ){
            console.log("sendContactEmailService-->UNAUTHORIZED!!!");
            // Request a new token
            //const newAccessToken = accessToken;
            // Do a retry with a new token
            //return sendContactEmailService(contactData, newAccessToken, false);
            throw authError;
          }else{
            console.log("sendContactEmailService-->throw authError!!!");
            throw authError;
          };
        });
  
        console.log(info);
        
      return info;

  };


  /**
   * Send Contact Email using notification service.
   * 
   * @param contactData ContactType
   * @param token Valid access token
   * @returns any
   */
  function sendContactEmailService(contactData: ContactType, accessToken: string ): Promise<any> {

    //Notification endpoint
    const URL = `${OriginConfig.URLPath.notifications}/sendContactEmail`;

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
          // Request a new token
          //const newAccessToken = accessToken;
          // Do a retry with a new token
          //return sendContactEmailService(contactData, newAccessToken, false);
          throw authError;
        }else{
          console.log("sendContactEmailService-->throw authError!!!");
          throw authError;
        };
      });

      console.log(info);
      
    return info;
  };

  return {
    sendContactEmailService,
    sendStartEmailConfirm
  };
};
