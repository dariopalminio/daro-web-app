
import * as GlobalConfig from '../../config/GlobalConfig';
import axios, { AxiosResponse } from 'axios';

/**
 * Get users Returns a list of users, filtered according to params.
 * 
 * @param username 
 * @param adminToken 
 * @returns 
 */
export default async function getUserByNameService(username: string, adminToken: string): Promise<any> {

  //User endpoint
  const URL = GlobalConfig.URLPath.users

  //If username = email
  const config = {
    headers: { Authorization: `Bearer ${adminToken}` },
    params: {
      email: username
    },
  }

  try {

    const response: AxiosResponse = await axios.get(URL, config)

    if (!response.data[0]) {
      throw new Error('keycloak.error.user-not-exist');
    }

    return response.data[0];

  } catch (error) {
    // response.status !== 200
    console.log(error.message)
    throw error;
  }
};
