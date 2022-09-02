import * as InfraConfig from '../infrastructure.config';
import axios, { AxiosPromise } from 'axios';
import { handleAxiosError, ApiError, AuthStatusEnum } from './api.client.error';
import { IProfileClient } from '../../domain/service/profile-client.interface';



export default function ProfileApiClientImpl(): IProfileClient {

  async function getProfileService(
    userName: string,
    accessToken: string
  ): Promise<any> {

    //users endpoint
    const URL = `${InfraConfig.APIEndpoints.users}/user`;

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
        if (authError.status === AuthStatusEnum.UNAUTHORIZED) {
          console.log("sendContactEmailService-->UNAUTHORIZED!!!");
          throw authError;
        } else {
          console.log("sendContactEmailService-->throw authError!!!");
          authError.message = "Can not send email. ";
          throw authError;
        };
      });

    console.log(info);

    return info;
  };

  async function updateProfile(
    userProfile: any,
    token: string): Promise<number> {

    try {
      //User endpoint
      const URL = `${InfraConfig.APIEndpoints.users}/profile/update`;

      const response = await axios({
        method: 'put',
        url: URL,
        headers: { 'Authorization': `Bearer ${token}` },
        data: userProfile
      });

      return response.status;
    } catch (error) {
      // response.status !== 200
      const authError: ApiError = handleAxiosError(error);
      throw authError;
    }
  };

  return {
    getProfileService,
    updateProfile
  };
};
