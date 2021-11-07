import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import { SessionType } from '../../model/user/session.type';
import * as StateConfig from '../../domain.config';
import { Tokens } from '../../model/user/tokens.type';
import { IAuthClient } from '../../service/auth-client.interface';

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
export default function useLogin(
    userClientInjected: IAuthClient | null = null) {
    const { setSessionValue, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ isProcessing: false, hasError: false, msg: '', isSuccess: false });
    
    const userClient: IAuthClient = userClientInjected ? userClientInjected : StateConfig.userClient;

    /**
     * login
     */
    const login = useCallback((email: string, password: string) => {
        const infoKey = "login.info.loading";
        setState({ isProcessing: true, hasError: false, msg: infoKey, isSuccess: false });

        // First: authenticate user and pass
        userClient.loginService(email, password)
            .then(tokens => {

                // Second: retrieve user information
                // Instead of making a new call to the api (with "getUserInfoService(jwt)"), 
                // we decode the jason web token.
                try {
                    const userSessionValue: SessionType = convertJwtToSessionType(tokens);
                    
                    if (userSessionValue && userSessionValue.email_verified === false) {
                        //Need to verify the email
                        const errorKey = "login.error.unconfirmed.account";
                        setState({ isProcessing: false, hasError: true, msg: errorKey, isSuccess: false });
                    }else{
                        // Authorized
                        const msgkey = "login.success.authorized";
                        setState({ isProcessing: false, hasError: false, msg: msgkey, isSuccess: true });
                    }
                    setSessionValue(userSessionValue);
                } catch (e: any) {
                    // Unauthorized by error in decoding JWT
                    setState({ isProcessing: false, hasError: true, msg: e.message, isSuccess: false });
                    removeSessionValue();
                }
            })
            .catch(err => {
                // Unauthorized
                setState({ isProcessing: false, hasError: true, msg: err.message, isSuccess: false });
                removeSessionValue();
            });
    }, [setState, setSessionValue, removeSessionValue]);

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
        isSuccess: state.isSuccess,
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        login,
    };
};