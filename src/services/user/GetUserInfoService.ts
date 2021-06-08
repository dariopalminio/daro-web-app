
import * as GlobalConfig from '../../config/GlobalConfig';
import axios, { AxiosResponse } from 'axios';

/**
 * Get users Returns a list of users, filtered according to params.
 * 
 * @param username 
 * @param adminToken 
 * @returns 
 */
export default async function getUserInfoService(jwt: string): Promise<any> {

    const URL = GlobalConfig.URLPath.userInfo

    const config = {
        headers: { Authorization: `Bearer ${jwt}` }
    }

    try {

        const response: AxiosResponse = await axios.get(URL, config)

        return response.data;

    } catch (error) {
        // response.status !== 200
        throw error;
    }
};
