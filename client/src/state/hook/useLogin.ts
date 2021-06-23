import { useCallback, useContext, useState } from 'react';
import SessionContext, { SessionContextType } from '../context/SessionContext';
import { SessionType } from '../model/user/SessionType';
import { AuthServiceFactory } from '../../origin/client/user/AuthServiceFactory';
import { IAuthService } from '../../state/client/IAuthService';
import * as GlobalConfig from '../../origin/config/GlobalConfig';

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
export default function useLogin() {
    const { setSessionValue, removeSessionValue } = useContext(SessionContext) as SessionContextType;
    const [state, setState] = useState({ loading: false, error: false, msg: '', isLoggedOk: false });
    const authService: IAuthService = AuthServiceFactory.create(GlobalConfig.is_fake_mode);

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
    const convertJwtToSessionType = (jwt: any) => {
        const jwtDecoded = jws.decode(jwt);
        if (!jwtDecoded) throw Error("Decoded JWT fail! JWT decoded is null.");
        const payload = jwtDecoded.payload;
        // Authorized
        const userSessionData: SessionType = {
            jwt: jwt,
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