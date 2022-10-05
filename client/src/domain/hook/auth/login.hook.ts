import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import { SessionType } from 'domain/model/auth/session.type';
import * as StateConfig from 'infra/global.config';
import { Tokens } from 'domain/model/auth/tokens.type';
import { IAuthClient } from 'domain/service/auth-client.interface';
import { IHookState, InitialState } from 'domain/hook/hook.type';
import { convertJwtToSessionType } from './convert-jwt';

/**
 * useLogin Custom Hook
 * 
 * @returns 
 *      isLogged: Boolean
 *      hasLoginError: string
 *      msg: string
 *      login function
 *      logout function
 */
export default function useLogin(
    userClientInjected: IAuthClient | null = null) {
    const { setNewSession, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState<IHookState>(InitialState);

    const authClient: IAuthClient = userClientInjected ? userClientInjected : StateConfig.userAuthClient;

    /**
     * login
     */
    const login = useCallback((email: string, password: string) => {
        const infoKey = "login.info.loading";
        setState({ isProcessing: true, hasError: false, msg: infoKey, isSuccess: false });

        console.log('useLogin');
        // First: authenticate user and pass
        authClient.loginService(email, password)
            .then(tokens => {
                console.log('useLogin.tokens', tokens);
                try {
                    const userSessionValue: SessionType = convertJwtToSessionType(tokens);

                    if (userSessionValue && userSessionValue.email_verified === false) {
                        //Need to verify the email
                        const errorKey = "login.error.unconfirmed.account";
                        setState({ isProcessing: false, hasError: true, msg: errorKey, isSuccess: false });
                    } else {
                        // Authorized
                        const msgkey = "login.success.authorized";
                        setState({ isProcessing: false, hasError: false, msg: msgkey, isSuccess: true });
                    }
                    setNewSession(userSessionValue);
                } catch (e: any) {
                    // Unauthorized by error in decoding JWT
                    const msgkeyUnauth = "login.error.unauthorized.decoding.JWT";
                    setState({ isProcessing: false, hasError: true, msg: msgkeyUnauth, isSuccess: false });
                    removeSessionValue();
                }
            })
            .catch(err => {
                // Unauthorized
                setState({ isProcessing: false, hasError: true, msg: err.message, isSuccess: false });
                removeSessionValue();
            });
    }, [setState, setNewSession, removeSessionValue, authClient]);

    return {
        isSuccess: state.isSuccess,
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        login,
    };
};