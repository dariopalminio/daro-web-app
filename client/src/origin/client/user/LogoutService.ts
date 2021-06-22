
import * as GlobalConfig from '../../config/GlobalConfig';
import axios, { AxiosResponse } from 'axios';
import { handleAxiosError, AuthError, AuthStatusEnum } from '../AuthError';

/**
 * Remove all user sessions associated with the user in auth server. 
 * Also send notification to all clients that have an admin URL to invalidate the 
 * sessions for the particular user.
 * URL FORMAT: http://127.0.0.1:8180/auth/admin/realms/${your-realm}/users/${user-id}/logout
 * POST Logout user [SAT].
 * Authorization: Bearer Token.
 * Headers: Content-Type application/json.
 * @param userId 
 * @param adminToken 
 * @returns 
 */
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
        const authError: AuthError = handleAxiosError(error);
        throw authError;
    }
};