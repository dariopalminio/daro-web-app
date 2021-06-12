import { useCallback, useContext, useState } from 'react';
import SessionContext, { SessionContextType, SessionType } from '../context/SessionContext';
import loginService from '../services/user/LoginService';
import getUserInfoService from '../services/user/GetUserInfoService';

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

    /**
     * login
     */
    const login = useCallback((email: string, password: string) => {
        setState({ loading: true, error: false, msg: "Trying to login!", isLoggedOk: false });

        // First: authenticate user and pass
        loginService(email, password)
            .then(jwt => {

                // Second: retrieve user information
                getUserInfoService(jwt).then(userdata => {
                    // Authorized
                    setState({ loading: false, error: false, msg: "Authorized", isLoggedOk: true });
                    const userValue: SessionType = {
                        jwt: jwt,
                        isLogged: true,
                        isRegistered: true,
                        email: userdata.email,
                        email_verified: userdata.email_verified,
                        given_name: userdata.given_name,
                        preferred_username: userdata.preferred_username,
                        userId: userdata.sub,
                    };
                    setSessionValue(userValue);
                }).catch(err => {
                    // Unauthorized
                    const errMsg = err.message;
                    setState({ loading: false, error: true, msg: errMsg, isLoggedOk: false });
                    removeSessionValue();
                })

            })
            .catch(err => {
                // Unauthorized
                setState({ loading: false, error: true, msg: err.message, isLoggedOk: false });
                removeSessionValue();
            })
    }, [setState, setSessionValue])

    return {
        isLoggedOk: state.isLoggedOk,
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        msg: state.msg,
        login,
    }
}