import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../context/session.context';
import { SessionType } from '../model/user/session.type';
import * as StateConfig from '../domain.config';
import { IAuthService, Tokens } from '../service/auth.service.interface';

var jws = require('jws');

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
export default function useLogin(authServiceInjected: IAuthService | null = null) {
    const { setSessionValue, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ loading: false, error: false, msg: '', isLoggedOk: false });
    
    const authService: IAuthService = authServiceInjected ? authServiceInjected : StateConfig.authorizationService;

    /**
     * login
     */
    const login = useCallback((email: string, password: string) => {
        setState({ loading: true, error: false, msg: "Trying to login!", isLoggedOk: false });

        // First: authenticate user and pass
        authService.loginService(email, password)
            .then(jwt => {
                // Second: retrieve user information
                // Instead of making a new call to the api (with "getUserInfoService(jwt)"), 
                // we decode the jason web token.
                try {
                    const userSessionValue: SessionType = convertJwtToSessionType(jwt);
                    // Authorized
                    setState({ loading: false, error: false, msg: "Authorized", isLoggedOk: true });
                    setSessionValue(userSessionValue);
                } catch (e) {
                    // Unauthorized by error in decoding JWT
                    setState({ loading: false, error: true, msg: e.message, isLoggedOk: false });
                    removeSessionValue();
                }
            })
            .catch(err => {
                // Unauthorized
                setState({ loading: false, error: true, msg: err.message, isLoggedOk: false });
                removeSessionValue();
            });
    }, [setState, setSessionValue, authService, removeSessionValue]);

    /**
     * Decode JWT and return data from payload in SessionType value.
     * @param jwt Jason Web Token
     * @returns SessionType object
     */
    const convertJwtToSessionType = (tokens: Tokens) => {
        const jwtDecoded = jws.decode(tokens.access_token);
        console.log("refresh_toke:",tokens.refresh_token);
        if (!jwtDecoded) throw Error("Decoded JWT fail! JWT decoded is null.");
        console.log("jwtDecoded:",jwtDecoded);
        const payload = jwtDecoded.payload;
        console.log("payload:",payload);
        // Authorizedaccess_token: (string | null),
        const userSessionData: SessionType = {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            isLogged: true,
            isRegistered: true,
            email: payload.email,
            email_verified: payload.email_verified,
            given_name: payload.given_name,
            preferred_username: payload.preferred_username,
            userId: payload.sub,
        };
        return userSessionData;
    };

    return {
        isLoggedOk: state.isLoggedOk,
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        msg: state.msg,
        login,
    };
};