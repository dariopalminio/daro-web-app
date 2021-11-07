import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import { SessionType } from '../../model/user/session.type';
import * as StateConfig from '../../domain.config';
import { IAuthTokensClient } from '../../service/auth-tokens-client.interface';
import { IAuthClient } from '../../service/auth-client.interface';

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
    userClientInjected: IAuthClient | null = null) {
    const { removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ isProcessing: false, hasError: false, msg: '', isSuccess: false });
    const authTokenService: IAuthTokensClient = authServiceInjected ? authServiceInjected : StateConfig.authorizationClient;
    const userClient: IAuthClient = userClientInjected ? userClientInjected : StateConfig.userClient;

    /**
     * logout function
     */
    const logout = useCallback((loggedUser: SessionType | undefined) => {
        setState({ isProcessing: true, hasError: false, msg: "logout.info.loading", isSuccess: false });

        const userId = loggedUser?.userId ? loggedUser?.userId : null;
        let msgKey = "";

        if (userId !== null) {

            // First: obtains admin access token
            const responseAdminToken: Promise<any> = authTokenService.getAdminTokenService();

            responseAdminToken.then(jwtAdminToken => {
                // Second: logoutService
                const responseLogout = userClient.logoutService(userId, jwtAdminToken);

                responseLogout.then(status => {
                    setState({ isProcessing: false, hasError: false, msg: "logout.success" , isSuccess: true });
                }).catch(err => {
                    msgKey = err.message;
                    setState({ isProcessing: false, hasError: true, msg: msgKey , isSuccess: false });
                });

            }).catch(err => {
                msgKey = err.message;
                setState({ isProcessing: false, hasError: true, msg: msgKey , isSuccess: false });
            });

        } else {
            setState({ isProcessing: false, hasError: true, msg: "logout.error.not.logged" , isSuccess: false });
        };

        removeSessionValue();
    }, [setState, removeSessionValue, authTokenService]);

    return {
        isSuccess: state.isSuccess,
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        logout,
    };
};