
import * as GlobalConfig from '../config/GlobalConfig';

const ENDPOINT =
  GlobalConfig.fake_endpoints ?
    GlobalConfig.FakeAPIEndpoints.auth : GlobalConfig.APIEndpoints.auth


export default function loginService({ email, password }: any) {
  console.log("loginService, email: ", email)
  console.log("loginService, password: ", password)

  return fetch(`${ENDPOINT}/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "email": email,
      "password": password
    })
  }).then(res => {
    if (!res.ok) {
      // 401 (Unauthorized) or other error
      const error = new Error('Response is NOT ok. Status: ' + res.status)
      throw error
    }
    return res.json()
  }).then(res => {
    // Response is OK and retrieve jwt acces token
    const { access_token } = res
    console.log(access_token)
    return access_token
  })
}



