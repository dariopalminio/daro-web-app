
import * as GlobalConfig from '../../config/GlobalConfig';
import axios from 'axios';
import qs from 'querystring'
import { ResponseType } from './ResponseType'

export type LoginRequest = {
  username: string
  password: string
  grant_type: string
  client_id: string
  client_secret: string
}

/**
 * Consumer cliente for login on Keycloak Server & Bearer Token & with client secret
 * configured with OpenID Endpoint configuration, Login with email = true and Access Type = public
 * @param param0 loginRequestData LoginRequest
 * @returns access_token JWT 
 * const showDrawer = () => {
 */
 export default async function loginService (user: string, pass: string): Promise<any>  {

    const body: LoginRequest = {
      username: user,
      password: pass,
      grant_type: 'password',
      client_id: GlobalConfig.Keycloak.client_id,
      client_secret: GlobalConfig.Keycloak.client_secret
    }
  
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
  };
  