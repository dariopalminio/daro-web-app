import * as GlobalConfig from '../../config/GlobalConfig';
import axios, { AxiosResponse } from 'axios';
import { handleAxiosError, AuthError } from './AuthError';
import { NewUserRepresentationType } from '../../../state/model/user/NewUserRepresentationType';

/**
 * registerService
 * 
 * Keycloak POST Create user [SAT]. Create a new user Username must be unique.
 * POST 'http://127.0.0.1:8180/auth/admin/realms/my-realm-test/users'
 * AUTHORIZATION: Bearer Token (Token is Admin Token)
 * HEADERS: Content-Type application/json
 * BODY: UserRepresentation
 * @param name 
 * @param lastname 
 * @param email 
 * @param password 
 * @returns 
 */
export default async function registerService(
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  adminToken: string): Promise<any> {

  const body: NewUserRepresentationType = {
    firstName: firstname,
    lastName: lastname,
    email: email,
    emailVerified: GlobalConfig.Keycloak.verify_email ? "false" : "true",
    username: email,
    credentials: [
      {
        type: 'password',
        value: password,
        temporary: "false",
      },
    ],
    enabled: "true",
  };

  //User endpoint
  const URL = GlobalConfig.URLPath.users;

  try {

    const response: AxiosResponse = await axios({
      method: 'post',
      url: URL,
      headers: { 'Authorization': `Bearer ${adminToken}` },
      data: body
    });

    return response.statusText;

  } catch (error) {
    console.log("SI EXCEPTION")
    // response.status !== 201
    // CONFLICT: error.message="Request failed with status code 409"
    // BAD_REQUEST: error.message="Request failed with status code 400"
    const e: AuthError = handleAxiosError(error);
    throw e;
  }
}
