import { useCallback, useContext, useState } from 'react';
import SessionContext, { SessionContextType } from '../context/SessionContext';
import { SessionType } from '../model/user/SessionType';
import * as StateConfig from '../StateConfig';
import { IAuthClient } from '../client/IAuthClient';

/**
 * cuseRegister Custom Hook
 * Custom Hook for create new user
 */
export default function useRegister(authServiceInjected: IAuthClient | null = null) {

    const { setSessionValue, removeSessionValue } = useContext(SessionContext) as SessionContextType;
    const [state, setState] = useState({ loading: false, error: false, msg: '', wasCreatedOk: false });
    const authService: IAuthClient = authServiceInjected ? authServiceInjected : StateConfig.authorizationService;
    
    /**
     * Register
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

            const resonseReg = authService.registerService(
                firstname,
                lastname,
                email,
                password, jwtAdminToken);

            resonseReg.then(statusText => {
                const msgText = statusText + " Your account has been created successfully. Now you can log in.";
                setState({ loading: false, error: false, msg: msgText, wasCreatedOk: true });
                const userValue: SessionType = {
                    jwt: "",
                    isLogged: false,
                    isRegistered: true,
                    email: "",
                    email_verified: false,
                    given_name: "",
                    preferred_username: "",
                    userId: "",
                };
                setSessionValue(userValue);
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