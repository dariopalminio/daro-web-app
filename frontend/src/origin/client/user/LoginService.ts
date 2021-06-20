
import * as GlobalConfig from '../../config/GlobalConfig';
import axios, { AxiosResponse } from 'axios';
import qs from 'querystring';
import { handleAxiosError, AuthError } from './AuthError';
import { LoginRequestType } from '../../../state/model/user/LoginRequestType';

/**
 * Consumer cliente for login on Keycloak Server & Bearer Token & with client secret
 * configured with OpenID Endpoint configuration, Login with email = true and Access Type = public
 * @param param0 loginRequestData LoginRequest
 * @returns access_token JWT 
 * const showDrawer = () => {
 */
export default async function loginService(username: string, pass: string): Promise<any> {

  const body: LoginRequestType = {
    username: username,
    password: pass,
    grant_type: 'password',
    client_id: GlobalConfig.Keycloak.CLIENT_ID,
    client_secret: GlobalConfig.Keycloak.CLIENT_SECRET
  };

  //Login endpoint
  const URL = GlobalConfig.URLPath.TOKEN;

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
