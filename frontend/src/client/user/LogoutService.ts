
import * as GlobalConfig from '../../config/GlobalConfig';
import axios, { AxiosResponse } from 'axios';
import { handleAxiosError, AuthError, AuthStatusEnum } from '../../client/user/AuthError';

export default async function logoutService(
    userId: string,
    adminToken: string): Promise<any> {

    //User endpoint
    const URL = `${GlobalConfig.URLPath.users}/${userId}/logout`;

    try {

        const response: AxiosResponse = await axios({
            method: 'post',
            url: URL,
            headers: { 'Authorization': `Bearer ${adminToken}` },
            data: {}
        });

        switch (response.status) {
            case AuthStatusEnum.NO_CONTENT:
                return true;
            default:
                return false;
        }

    } catch (error) {
        // response.status !== 201
        // CONFLICT: error.message="Request failed with status code 409"
        // BAD_REQUEST: error.message="Request failed with status code 400"
        const e: AuthError = handleAxiosError(error);
        throw e;
    }
};