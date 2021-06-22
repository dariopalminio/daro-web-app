import * as GlobalConfig from '../../config/GlobalConfig';
import axios, { AxiosResponse } from 'axios';
import { handleAxiosError, AuthError } from '../AuthError';
import qs from 'querystring'

export type NewAdminTokenRequestType = {
  client_id: string,
  grant_type: string,
  username: string,
  password: string,
  scope: string,
  client_secret: string,
};

/**
 * Generate a admin access token for create user
 * same login url: `/auth/realms/${your-realm}/protocol/openid-connect/token`,
 * headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
*/
export default async function getAdminTokenService(): Promise<any> {

  const body: NewAdminTokenRequestType = {
    client_id: GlobalConfig.Keycloak.client_id,
    grant_type: 'password',
    username: GlobalConfig.Keycloak.username_admin,
    password: GlobalConfig.Keycloak.password_admin,
    scope: 'openid roles',
    client_secret: GlobalConfig.Keycloak.client_secret,
  };

  // Token endpoint
  const URL = GlobalConfig.URLPath.token

  try {
    //post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    const response: AxiosResponse = await axios.post(URL, qs.stringify(body))

    const { access_token } = response.data

    return access_token
    
  } catch (error) {
    // response.status !== 200
    const authError: AuthError = handleAxiosError(error);
    throw authError;
  }
}
