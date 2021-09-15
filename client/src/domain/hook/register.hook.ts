import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../context/session.context';
import { SessionType } from '../model/user/session.type';
import * as StateConfig from '../domain.config';
import { IAuthService } from '../service/auth.service.interface';

/**
 * use Register
 * Custom Hook for create new user
 */
export default function useRegister(authServiceInjected: IAuthService | null = null) {

    const { setSessionValue, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ loading: false, error: false, msg: '', wasCreatedOk: false });
    const authService: IAuthService = authServiceInjected ? authServiceInjected : StateConfig.authorizationService;
    
    /**
     * Register function
     */
    const register = useCallback((
        firstname: string,
        lastname: string,
        email: string,
        password: string) => {

        setState({ loading: true, error: false, msg: "Trying to Register!", wasCreatedOk: false });

        // First: obtains admin access token
        const responseAdminToken: Promise<any> = authService.getAdminTokenService();

        // Second: creates a new user with authorization using admin access token
        responseAdminToken.then(jwtAdminToken => {

            const responseReg = authService.registerService(
                firstname,
                lastname,
                email,
                password, jwtAdminToken);
            // Third: verifies that the user was created, asking for the information of the created user
            responseReg.then(statusNumber => {

                const responseGetUser = authService.getUserByEmailService(
                    email,
                    jwtAdminToken);
                
                responseGetUser.then(data => {

                    if (!data[0]) {
                        // keycloak.error.user-not-exist
                        setState({ loading: false, error: true, msg: "keycloak.error.user-not-exist!", wasCreatedOk: false });
                        removeSessionValue();
                    }else{ // keycloak ok because user-exist

                        console.log("Result data from register:", data[0]);
                        const msgText = " Your account has been created successfully. Now you can log in.";
                        setState({ loading: false, error: false, msg: msgText, wasCreatedOk: true });
                        const userValue: SessionType = {
                            access_token: null,
                            refresh_token: null,
                            expires_in: 0,
                            refresh_expires_in: 0,
                            date: new Date(),
                            isLogged: false,
                            isRegistered: true,
                            email: email,
                            email_verified: data[0].emailVerified,
                            given_name: data[0].firstName,
                            preferred_username: data[0].firstName,
                            userId: data[0].id,
                        };
                        console.log("userValue:", userValue);
                        setSessionValue(userValue);
                    }
                }).catch(err => {
                    // Error when get user
                    setState({ loading: false, error: true, msg: err.message, wasCreatedOk: false });
                    removeSessionValue();
                });


            }).catch(err => {
                // Request failed with status code 409 (Conflict) or 400 (Bad Request)
                setState({ loading: false, error: true, msg: err.message, wasCreatedOk: false });
                removeSessionValue();
            });

        }).catch(err => {
            // Error Can not acquire Admin token from service
            const errorText = err.message + " Error Can not acquire Admin token from service."
            setState({ loading: false, error: true, msg: errorText, wasCreatedOk: false });
            removeSessionValue();
        });

    }, [setState, setSessionValue, removeSessionValue, authService]);


    return {
        wasCreatedOk: state.wasCreatedOk,
        isRegisterLoading: state.loading,
        hasRegisterError: state.error,
        msg: state.msg,
        register,
    };
};