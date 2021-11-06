import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import { SessionType } from '../../model/user/session.type';
import * as StateConfig from '../../domain.config';
import { IAuthTokensClient } from '../../service/auth-tokens-client.interface';
import { IUserClient } from '../../service/user-client.interface';

/**
 * use Register
 * Custom Hook for create new user
 */
export default function useRegister(authServiceInjected: IAuthTokensClient | null = null,
    userClientInjected: IUserClient | null = null) {

    const { setSessionValue, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ loading: false, error: false, msg: '', wasCreatedOk: false });
    const authTokenService: IAuthTokensClient = authServiceInjected ? authServiceInjected : StateConfig.authorizationClient;
    const userClient: IUserClient = userClientInjected ? userClientInjected : StateConfig.userClient;

    /**
     * Register function
     * Create new user in registration process.
     */
    const register = useCallback((
        firstname: string,
        lastname: string,
        email: string,
        password: string) => {

        setState({ loading: true, error: false, msg: "register.info.loading", wasCreatedOk: false });

        // First: obtains admin access token
        const responseAdminToken: Promise<any> = authTokenService.getAdminTokenService();

        // Second: creates a new user with authorization using admin access token
        responseAdminToken.then(jwtAdminToken => {

            const responseReg = userClient.register(
                email,
                firstname,
                lastname,
                email,
                password, jwtAdminToken);
            
            responseReg.then(resp => {
                console.log("register response:", resp);
                        const userValue: SessionType = {
                            createdTimestamp: "",
                            access_token: null,
                            refresh_token: null,
                            expires_in: 0,
                            refresh_expires_in: 0,
                            date: new Date(),
                            isLogged: false,
                            isRegistered: true,
                            email: email,
                            email_verified: false,
                            given_name: firstname,
                            preferred_username: firstname,
                            userId: "",
                        };
                        
                        setSessionValue(userValue);
                        setState({ loading: false, error: false, msg: "", wasCreatedOk: true });

            }).catch(err => {
                // Request failed with status code 409 (Conflict) or 400 (Bad Request)
                setState({ loading: false, error: true, msg: err.message, wasCreatedOk: false });
                removeSessionValue();
            });

        }).catch(err => {
            // Error Can not acquire Admin token from service
            const errorMsgKey = "register.error.cannot.acquire.token";
            setState({ loading: false, error: true, msg: errorMsgKey, wasCreatedOk: false });
            removeSessionValue();
        });

    }, [setState, setSessionValue, removeSessionValue, authTokenService]);


    return {
        wasCreatedOk: state.wasCreatedOk,
        isRegisterLoading: state.loading,
        hasRegisterError: state.error,
        msg: state.msg,
        register,
    };
};