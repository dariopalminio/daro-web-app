
import * as GlobalConfig from '../config/GlobalConfig';
import axios from 'axios';


const ENDPOINT =
  GlobalConfig.fake_endpoints ?
    GlobalConfig.FakeAPIEndpoints.auth : GlobalConfig.APIEndpoints.auth

export type LoginRequest = {
  email: string
  password: string
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
 * Consumer cliente for login on User Service server
 * @param param0 loginRequestData LoginRequest
 * @returns access_token JWT
 */
export const callLoginService = async (loginRequestData: LoginRequest): Promise<any> => {
  console.log("callLogin loginService, email: ", loginRequestData.email)
  console.log("callLogin loginService, password: ", loginRequestData.password)

  let url = `${ENDPOINT}/login`

  const response: LoginResponse = await axios.post(url, loginRequestData)

  if (response.status !== 200) {
    // Unauthorized or other error (401, 400, 406...)
    throw new Error('Response is NOT OK. Could not authenticate!')
  }

  const { access_token } = response.data //data={access_token: "..."}
  
  return access_token
}
