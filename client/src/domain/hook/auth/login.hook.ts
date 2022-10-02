import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import { SessionType } from '../../model/auth/session.type';
import * as StateConfig from '../../../infra/global.config';
import { Tokens } from '../../model/auth/tokens.type';
import { IAuthClient } from '../../service/auth-client.interface';
import { IHookState, InitialState } from '../hook.type';


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

    /**
     * Decode JWT and return data from payload in SessionType value.
     * @param jwt Jason Web Token
     * @returns SessionType object
     */
    const convertJwtToSessionType = (tokens: Tokens) => {
        const jwtDecoded = jws.decode(tokens.access_token);
        //console.log("refresh_toke:",tokens.refresh_token);
        const errorJwtDecodedFail = "Decoded JWT fail! JWT decoded is null.";
        if (!jwtDecoded) throw Error(errorJwtDecodedFail);
        //console.log("jwtDecoded:",jwtDecoded);
        const payload = jwtDecoded.payload;
        console.log("payload:", payload);

        //StateConfig.clientId
        //const roles = payload.resource_access.rest-client-test.roles //  ['uma_protection', 'admin', 'user']

        let theRoles = [];
        try {
            theRoles = payload.resource_access['rest-client-test'].roles;
            console.log("ROLES:", theRoles);
        } catch (err) {
            console.log('Roles not found in JWT!');
        }
        //console.log("payload:",payload);
        // Authorizedaccess_token: (string | null),
        const userSessionData: SessionType = {
            createdTimestamp: '', //TODO
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_in: tokens.expires_in,
            refresh_expires_in: tokens.refresh_expires_in,
            date: tokens.date,
            isLogged: payload.email_verified, //If email ferified is logged
            email: payload.email,
            email_verified: payload.email_verified,
            given_name: payload.given_name,
            preferred_username: payload.preferred_username,
            userId: payload.sub,
            roles: theRoles
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