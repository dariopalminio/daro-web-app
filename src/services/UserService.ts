
import * as GlobalConfig from '../config/GlobalConfig';
import axios from 'axios';
import qs from 'querystring'

export type LoginRequest = {
  username: string
  password: string
  grant_type: string
  client_id: string
}

export type LoginResponse =
  {
    // `data` is the response that was provided by the server
    //data.access_token
    data: { access_token: string }

    // `status` is the HTTP status code from the server response
    status: any

    // `statusText` is the HTTP status message from the server response
    statusText: string

    // `headers` the HTTP headers that the server responded with
    // All header names are lower cased and can be accessed using the bracket notation.
    // Example: `response.headers['content-type']`
    headers: {}

    // `config` is the config that was provided to `axios` for the request
    config: {}

    // `request` is the request that generated this response
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance in the browser
    request: {}
  }

/**
 * Consumer cliente for login on Keycloak Server & Bearer Token
 * configured with OpenID Endpoint configuration, Login with email = true and Access Type = public
 * @param param0 loginRequestData LoginRequest
 * @returns access_token JWT
 */
export const loginService = async (user: string, pass: string): Promise<any> => {

  let loginRequestData: LoginRequest = {
    username: user,
    password: pass,
    grant_type: 'password',
    client_id: GlobalConfig.Keycloak.client_id
  }

  const ENDPOINT = GlobalConfig.APIEndpoints.auth

  const REALM = GlobalConfig.Keycloak.realm

  const URL = `${ENDPOINT}/auth/realms/${REALM}/protocol/openid-connect/token`

  const response: LoginResponse = await axios.post(URL, qs.stringify(loginRequestData))

  if (response.status !== 200) {
    // Unauthorized or other error (401, 400, 406...)
    throw new Error('Response is NOT OK. Could not authenticate!')
  }

  const { access_token } = response.data

  return access_token
}