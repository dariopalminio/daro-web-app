import * as InfraConfig from 'infra/global.config';
import { AxiosPromise } from 'axios';
import { handleAxiosError, ApiError, AuthStatusEnum } from 'infra/client/api.error';
import { IProfileClient } from 'domain/service/profile-client.interface';
import axiosInstance from './interceptor/axios.interceptor';



export default function ProfileApiClientImpl(): IProfileClient {

  async function getProfileService(
    userName: string
  ): Promise<any> {

    //users endpoint
    const URL = `${InfraConfig.APIEndpoints.users}/user`;

    const config = {
      //headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        userName: userName
      },
    }
    const promise: AxiosPromise<any> = axiosInstance.get(URL, config)

    // Using .then, create a new promise which extracts the data
    const info: Promise<any> = promise
      .then((response) => response.data)
      .catch((error) => {
        const authError: ApiError = handleAxiosError(error);
        if (authError.status === AuthStatusEnum.UNAUTHORIZED) {
          console.log("getProfileService-->UNAUTHORIZED!!!",authError);
          throw authError;
        } else {
          console.log("getProfileService-->throw authError!!!");
          authError.message = "Can not send email. ";
          throw authError;
        };
      });

    console.log(info);

    return info;
  };

  async function updateProfile(
    userProfile: any): Promise<number> {

    try {
      //User endpoint
      const URL = `${InfraConfig.APIEndpoints.users}/profile/update`;

      const response = await axiosInstance({
        method: 'put',
        url: URL,
        //headers: { 'Authorization': `Bearer ${token}` },
        data: userProfile
      });

      return response.status;
    } catch (error:any) {
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
