import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import { SessionType } from '../../model/user/session.type';
import * as StateConfig from '../../domain.config';
import { IAuthClient, Tokens } from '../../service/auth-client.interface';

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
export default function useLogin(authServiceInjected: IAuthClient | null = null) {
    const { setSessionValue, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ loading: false, error: false, msg: '', isLoggedOk: false, isEmailVerified: false });
    
    const authService: IAuthClient = authServiceInjected ? authServiceInjected : StateConfig.authorizationClient;

    /**
     * login
     */
    const login = useCallback((email: string, password: string) => {
        const infoKey = "login.info.loading";
        setState({ loading: true, error: false, msg: infoKey, isLoggedOk: false, isEmailVerified: false });

        // First: authenticate user and pass
        authService.loginService(email, password)
            .then(jwt => {
                // Second: retrieve user information
                // Instead of making a new call to the api (with "getUserInfoService(jwt)"), 
                // we decode the jason web token.
                try {
                    const userSessionValue: SessionType = convertJwtToSessionType(jwt);
                    
                    if (userSessionValue && userSessionValue.email_verified == false) {
                        //Need to verify the email
                        const errorKey = "login.error.unconfirmed.account";
                        setState({ loading: false, error: true, msg: errorKey, isLoggedOk: false, isEmailVerified: false });
                    }else{
                        // Authorized
                        const msgkey = "login.success.authorized";
                        setState({ loading: false, error: false, msg: msgkey, isLoggedOk: true, isEmailVerified: true });
                    }
                    setSessionValue(userSessionValue);
                } catch (e: any) {
                    // Unauthorized by error in decoding JWT
                    setState({ loading: false, error: true, msg: e.message, isLoggedOk: false, isEmailVerified: false });
                    removeSessionValue();
                }
            })
            .catch(err => {
                // Unauthorized
                setState({ loading: false, error: true, msg: err.message, isLoggedOk: false, isEmailVerified: false });
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
        const errorJwtDecodedFail = "Decoded JWT fail! JWT decoded is null.";
        if (!jwtDecoded) throw Error(errorJwtDecodedFail);
        console.log("jwtDecoded:",jwtDecoded);
        const payload = jwtDecoded.payload;
        console.log("payload:",payload);
        // Authorizedaccess_token: (string | null),
        const userSessionData: SessionType = {
            createdTimestamp: '', //TODO
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_in: tokens.expires_in,
            refresh_expires_in: tokens.refresh_expires_in,
            date: tokens.date,
            isLogged: payload.email_verified, //If email ferified is logged
            isRegistered: payload.email_verified, //If email ferified is registered
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
        isEmailVerified: state.isEmailVerified,
        login,
    };
};