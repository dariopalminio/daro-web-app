
import * as GlobalConfig from '../../config/GlobalConfig';
import axios, { AxiosResponse } from 'axios';
import { handleAxiosError, AuthError } from '../../services/user/AuthError';

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
        //get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
        const response: AxiosResponse = await axios.get(URL, config)

        return response.data;

    } catch (error) {
        // response.status !== 200
        const e: AuthError = handleAxiosError(error);
        throw e;
    }
};
