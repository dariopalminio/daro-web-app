
import * as GlobalConfig from '../../config/GlobalConfig';
import axios, { AxiosResponse } from 'axios';
import qs from 'querystring';
import { handleAxiosError, AuthError } from '../../client/user/AuthError';

export type LoginRequest = {
  username: string
  password: string
  grant_type: string
  client_id: string
  client_secret: string
};

/**
 * Consumer cliente for login on Keycloak Server & Bearer Token & with client secret
 * configured with OpenID Endpoint configuration, Login with email = true and Access Type = public
 * @param param0 loginRequestData LoginRequest
 * @returns access_token JWT 
 * const showDrawer = () => {
 */
export default async function loginService(username: string, pass: string): Promise<any> {

  const body: LoginRequest = {
    username: username,
    password: pass,
    grant_type: 'password',
    client_id: GlobalConfig.Keycloak.client_id,
    client_secret: GlobalConfig.Keycloak.client_secret
  };

  //Login endpoint
  const URL = GlobalConfig.URLPath.token;

  try {
    //post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    const response: AxiosResponse = await axios.post(URL, qs.stringify(body));

    const { access_token } = response.data;

    return access_token;

  } catch (error) {
    // response.status !== 200
    const e: AuthError = handleAxiosError(error);
    throw e;
  };
};
