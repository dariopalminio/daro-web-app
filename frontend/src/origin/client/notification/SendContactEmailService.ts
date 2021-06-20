
import * as GlobalConfig from '../../config/GlobalConfig';
import axios, { AxiosResponse } from 'axios';
import qs from 'querystring';
import { handleAxiosError, AuthError } from '../AuthError';
import { ContactType } from '../../../state/model/notification/ContactType';

export default async function sendContactEmailService(contactData: ContactType, token: string): Promise<any> {

  //Notification endpoint
  const URL = GlobalConfig.URLPath.NOTIFICATION;

  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: URL,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type':  `application/json`,},
      data: contactData
    });

    const info = response.data;

    return info;

  } catch (error) {
    // response.status !== 200
    console.log(error.message);
    const e: AuthError = handleAxiosError(error);
    throw e;
  };
};
