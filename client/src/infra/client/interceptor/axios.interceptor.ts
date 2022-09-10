import * as InfraConfig from '../../infrastructure.config';
import axios from 'axios';
import * as Storage from '../../storage/browser.storage';
import { IAuthTokensClient } from '../../../domain/service/auth-tokens-client.interface';
import { AuthApiClientFactory } from '../factory/auth-api-client.factory';


const authTokensClient: IAuthTokensClient = AuthApiClientFactory.create(InfraConfig.is_fake_mode);
/**
 * axios instance
 */
let axiosInstance = axios.create();


/**
 * Request header Interceptors
 */
axiosInstance.interceptors.request.use((config) => {

  const accessToken = Storage.getAccessToken();
  config.headers = { 'Authorization': `Bearer ${accessToken}` };
  console.log("axios_instance.config:", config);

  return config
}, error => {
  return Promise.reject(error)
})

/**
 * Response Interceptors
 */
axiosInstance.interceptors.response.use((response) => {
  console.log('Interceptor.response: ', response);
  return response
}, async (error) => {
  const config = error.config;
  console.warn('Error status', error.response.status)
  // return Promise.reject(error)
  if (error.response) {

    if (error.response && error.response.status === 401 && !config._retry) {
      config._retry = true;
      try {
        const localRefreshToken: string = Storage.getRefreshToken();
        const res = await authTokensClient.getRefreshTokenService(localRefreshToken);

        if (res?.status === 200) {
          console.log("New acces token was recovery using refresh token!");
          const { access_token, refresh_token } = res.data;
          const session = Storage.recoverySessionFromStorage();
          let newSession = { ...session };
          newSession.access_token = access_token;
          newSession.refresh_token = refresh_token;
          Storage.setSessionToStorage(newSession);
          config.headers = { 'Authorization': `Bearer ${access_token}` };
        }
        return axiosInstance(config);

      } catch (err) {
        console.log("axiosInstance. catch errs", err);
        return Promise.reject(err)
      }
    }
    return Promise.reject(error);
  } else {
    console.log('Interceptor.error: ', error);
    return Promise.reject(error)
  }
})

export default axiosInstance;