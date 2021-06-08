import * as GlobalConfig from '../../config/GlobalConfig';
import axios, { AxiosResponse } from 'axios';

export type UserRepresentation = {
  username: string
  enabled: string
  emailVerified: string
  firstName: string
  lastName: string
  email: string
  credentials: [
    {
      type: string,
      value: string,
      temporary: string,
    },
  ],
}

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
  jwt: string): Promise<any> {

  const body: UserRepresentation = {
    firstName: firstname,
    lastName: lastname,
    email: email,
    emailVerified: "true",
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

  const ENDPOINT = GlobalConfig.APIEndpoints.auth
  const REALM = GlobalConfig.Keycloak.realm
  const URL = `${ENDPOINT}/auth/admin/realms/${REALM}/users`

  try {

    const response: AxiosResponse = await axios({
      method: 'post',
      url: URL,
      headers: { 'Authorization': `Bearer ${jwt}` },
      data: body
    });


    console.log(response.status);
    console.log(response);
    return response.statusText

  } catch (error) {
    // response.status !== 201
    // CONFLICT: error.message="Request failed with status code 409"
    // BAD_REQUEST: error.message="Request failed with status code 400"
    throw error;
  }
}
