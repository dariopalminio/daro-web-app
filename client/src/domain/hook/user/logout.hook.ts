import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import { SessionType } from '../../model/user/session.type';
import * as StateConfig from '../../domain.config';
import { IAuthTokensClient } from '../../service/auth-tokens-client.interface';
import { IUserClient } from '../../service/user-client.interface';

/**
 * use Logout 
 * 
 * Custom Hook
 * 
 * @returns 
 *      isLogged: Boolean
 *      hasLoginError: string
 *      msg: string
 *      login function
 *      logout function
 */
export default function useLogout(authServiceInjected: IAuthTokensClient | null = null,
    userClientInjected: IUserClient | null = null) {
    const { removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ loading: false, error: false, msg: '', isLoggedOk: false });
    const authTokenService: IAuthTokensClient = authServiceInjected ? authServiceInjected : StateConfig.authorizationClient;
    const userClient: IUserClient = userClientInjected ? userClientInjected : StateConfig.userClient;

    /**
     * logout function
     */
    const logout = useCallback((loggedUser: SessionType | undefined) => {
        setState({ loading: true, error: false, msg: "logout.info.loading", isLoggedOk: true });

        const userId = loggedUser?.userId ? loggedUser?.userId : null;
        let msgKey = "";
        let thereWasError = false;

        if (userId !== null) {

            // First: obtains admin access token
            const responseAdminToken: Promise<any> = authTokenService.getAdminTokenService();

            responseAdminToken.then(jwtAdminToken => {
                // Second: logoutService
                const responseLogout = userClient.logoutService(userId, jwtAdminToken);

                responseLogout.then(status => {

                    msgKey = "logout.success";
                }).catch(err => {
                    thereWasError = true;
                    msgKey = err.message;
                });

            }).catch(err => {
                thereWasError = true;
                msgKey = err.message;
            });

        } else {
            thereWasError = true;
            msgKey = "logout.error.not.logged";
        };

        setState({ loading: false, error: thereWasError, msg: msgKey , isLoggedOk: false });
        removeSessionValue();
    }, [setState, removeSessionValue, authTokenService]);

    return {
        isLoggedOk: state.isLoggedOk,
        isLogoutLoading: state.loading,
        hasLogoutError: state.error,
        msg: state.msg,
        logout,
    };
};