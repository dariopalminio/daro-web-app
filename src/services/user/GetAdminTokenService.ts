import * as GlobalConfig from '../../config/GlobalConfig';
import axios from 'axios';
import qs from 'querystring'
import { ResponseType } from './ResponseType'

export type NewAdminTokenRequestBody = {
  client_id: string,
  grant_type: string,
  username: string,
  password: string,
  scope: string,
  client_secret: string,
};

/**
 * Generate a admin access token for create user
 * same login url: `/auth/realms/my-realm-test/protocol/openid-connect/token`,
 * headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
*/
export default async function getAdminTokenService(): Promise<any> {

    const body: NewAdminTokenRequestBody = {
      client_id: GlobalConfig.Keycloak.client_id,
      grant_type: 'password',
      username: GlobalConfig.Keycloak.username_admin,
      password: GlobalConfig.Keycloak.password_admin,
      scope: 'openid roles',
      client_secret: GlobalConfig.Keycloak.client_secret,
    };
  
    const ENDPOINT = GlobalConfig.APIEndpoints.auth
    const REALM = GlobalConfig.Keycloak.realm
    const URL = `${ENDPOINT}/auth/realms/${REALM}/protocol/openid-connect/token`
  
    const response: ResponseType = await axios.post(URL, qs.stringify(body))
  
    if (response.status !== 200) {
      // Unauthorized or other error (401, 400, 406...)
      throw new Error('Response is NOT OK. Could not authenticate!')
    }
  
    const { access_token } = response.data
  
    return access_token
  }
  