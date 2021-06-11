import { useCallback, useContext, useState } from 'react';
import getAdminTokenService from '../services/user/GetAdminTokenService';
import SessionContext, { SessionContextType, SessionType } from '../context/SessionContext';
import registerService from '../services/user/RegisterService';

/**
 * cuseRegister Custom Hook
 * Custom Hook for create new user
 */
export default function useRegister() {

    const { setSessionValue, removeSessionValue } = useContext(SessionContext) as SessionContextType;
    const [state, setState] = useState({ loading: false, error: false, msg: '', wasCreatedOk: false });

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
        const responseAdminToken: Promise<any> = getAdminTokenService();

        // Second: creates a new user with authorization using admin access token
        responseAdminToken.then(jwtAdminToken => {

            const resonseReg = registerService(
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
            })

        })
            .catch(err => {
                // Error Can not acquire Admin token from service
                const errorText = err.message + " " + "Error Can not acquire Admin token from service."
                setState({ loading: false, error: true, msg: errorText, wasCreatedOk: false });
                removeSessionValue();
            })

    }, [setState, setSessionValue])


    return {
        wasCreatedOk: state.wasCreatedOk,
        isRegisterLoading: state.loading,
        hasRegisterError: state.error,
        msg: state.msg,
        register,
    };
};