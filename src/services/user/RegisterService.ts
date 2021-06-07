import * as GlobalConfig from '../../config/GlobalConfig';
import axios from 'axios';

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

  const response = await axios({
    method: 'post',
    url: URL,
    headers: { 'Authorization': `Bearer ${jwt}` },
    data: body
  });


  console.log(response.status);
  console.log(response);

  switch (response.status) {
    case 409: //CONFLICT
      const error = new Error('Response is NOT OK. CONFLICT: Username already exists!')
      throw error
    case 400: //BAD_REQUEST:
      throw new Error('Response is NOT OK. BAD REQUEST!')
    case 201: //Created
      return response.statusText
    default:
      throw new Error('Response is NOT OK. Could not register. There was some mistake!')
  }

}
