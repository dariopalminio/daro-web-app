import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import { SessionType } from '../../model/auth/session.type';
import * as StateConfig from '../../domain.config';
import { IAuthTokensClient } from '../../service/auth-tokens-client.interface';
import { IAuthClient } from '../../service/auth-client.interface';
import { IHookState, InitialState } from '../hook.type';

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
    const [state, setState] = useState<IHookState>(InitialState);
    const authTokenService: IAuthTokensClient = authServiceInjected ? authServiceInjected : StateConfig.authTokensClient;
    const authClient: IAuthClient = userClientInjected ? userClientInjected : StateConfig.userAuthClient;

    /**
     * logout function
     */
    const logout = useCallback((loggedUser: SessionType | undefined) => {
        setState({ isProcessing: true, hasError: false, msg: "logout.info.loading", isSuccess: false });

        console.log('logout...');
        removeSessionValue();

        const userId = loggedUser?.userId ? loggedUser?.userId : null;
        let msgKey = "";

        if (userId !== null) {

            // First: obtains admin access token
            const responseAdminToken: Promise<any> = authTokenService.getAdminTokenService();

            responseAdminToken.then(jwtAdminToken => {
                // Second: logoutService
                const responseLogout = authClient.logoutService(userId, jwtAdminToken);

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

    }, [setState, removeSessionValue, authTokenService, authClient]);

    return {
        isSuccess: state.isSuccess,
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        logout,
    };
};