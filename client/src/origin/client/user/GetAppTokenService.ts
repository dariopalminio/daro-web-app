
import * as GlobalConfig from '../../config/GlobalConfig';
import axios, { AxiosResponse } from 'axios';
import { handleAxiosError, AuthError } from '../AuthError';
import qs from 'querystring'

export type RequesAppToken = {
  client_id: string
  grant_type: string
  client_secret: string
};

/**
 * Get Access Token for application from auth server.
 * Obtain SAT (service account token).
 * Method POST[SAT] Obtain accsess token from a service account. 
 * Content-Type: application/x-www-form-urlencoded.
 * Body with client_id, client_secret and grant_type.
*/
export default async function getAppTokenService(): Promise<any> {

  const body: RequesAppToken = {
    client_id: GlobalConfig.Keycloak.client_id,
    grant_type: 'client_credentials',
    client_secret: GlobalConfig.Keycloak.client_secret,
  };

  // Token endpoint
  const URL = GlobalConfig.URLPath.token
  console.log("GlobalConfig.URLPath.TOKEN:");
console.log(GlobalConfig.URLPath.token);
  try {
    //post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    const response: AxiosResponse = await axios.post(URL, qs.stringify(body));

    const { access_token } = response.data;

    return access_token;
    
  } catch (error) {
    // response.status !== 200
    const authError: AuthError = handleAxiosError(error);
    throw authError;
  };
};




