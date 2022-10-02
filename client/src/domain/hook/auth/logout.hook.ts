import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import { SessionType } from '../../model/auth/session.type';
import * as StateConfig from '../../../infra/global.config';
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
export default function useLogout(
    userClientInjected: IAuthClient | null = null) {
    const { removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState<IHookState>(InitialState);
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

            const responseLogout = authClient.logoutService(userId);

            responseLogout.then(status => {
                setState({ isProcessing: false, hasError: false, msg: "logout.success", isSuccess: true });
            }).catch(err => {
                msgKey = err.message;
                setState({ isProcessing: false, hasError: true, msg: msgKey, isSuccess: false });
            });

        } else {
            setState({ isProcessing: false, hasError: true, msg: "logout.error.not.logged", isSuccess: false });
        };

    }, [setState, removeSessionValue, authClient]);

    return {
        isSuccess: state.isSuccess,
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        logout,
    };
};