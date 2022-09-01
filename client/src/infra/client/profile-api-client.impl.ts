import * as InfraConfig from '../infrastructure.config';
import axios, { AxiosPromise } from 'axios';
import { handleAxiosError, ApiError, AuthStatusEnum } from './api.client.error';
import { IProfileClient } from '../../domain/service/profile-client.interface';



export default function ProfileApiClientImpl(): IProfileClient {

    async function  getProfileService (
        userName: string,
        accessToken: string
      ): Promise<any>{

    //users endpoint
    const URL = `${InfraConfig.APIEndpoints.users}/user`;
console.log('URL ...:',URL);
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
            userName: userName
        },
      }
    const promise: AxiosPromise<any> = axios.get(URL, config)

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
    getProfileService
  };
};
