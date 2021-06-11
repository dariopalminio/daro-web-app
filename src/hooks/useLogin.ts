import { useCallback, useContext, useState } from 'react';
import SessionContext, { SessionContextType, SessionType, SessionDefaultValue } from '../context/SessionContext';
import loginService from '../services/user/LoginService';
import getAdminTokenService from '../services/user/GetAdminTokenService';
import getUserInfoService from '../services/user/GetUserInfoService';
import logoutService from '../services/user/LogoutService';
import qs from 'querystring';

/**
 * useUser Custom Hook
 * 
 * @returns 
 *      isLogged: Boolean
 *      hasLoginError: string
 *      msg: string
 *      login function
 *      logout function
 */
export default function useLogin() {
    const { session, setSession } = useContext(SessionContext) as SessionContextType;
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
                    window.sessionStorage.setItem('jwt', qs.stringify(jwt));
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
                    setSession(userValue);
                }).catch(err => {
                    // Unauthorized
                    window.sessionStorage.removeItem('jwt');
                    const errMsg = err.message;
                    setState({ loading: false, error: true, msg: errMsg, isLoggedOk: false });
                    setSession(SessionDefaultValue);
                })

            })
            .catch(err => {
                // Unauthorized
                window.sessionStorage.removeItem('jwt');
                setState({ loading: false, error: true, msg: err.message, isLoggedOk: false });
                setSession(SessionDefaultValue);
            })
    }, [setState, setSession])

    /**
     * logout
     */
    const logout = useCallback((loggedUser: SessionType | undefined) => {
        setState({ loading: true, error: false, msg: "Trying to logout!", isLoggedOk: true })

        const userId = loggedUser?.userId ? loggedUser?.userId : null;
        let msg = "";
        let thereWasError = false;

        if (userId !== null) {

            // First: obtains admin access token
            const responseAdminToken: Promise<any> = getAdminTokenService();

            responseAdminToken.then(jwtAdminToken => {
                // Second: logoutService
                const responseLogout = logoutService(userId, jwtAdminToken)

                responseLogout.then(ok => {
                    msg = "Closed session. ";
                }).catch(err => {
                    thereWasError = true;
                    msg = "Falló logout in API." + err.message;
                })

            }).catch(err => {
                thereWasError = true;
                msg = err.message;
            })
        } else {
            thereWasError = true;
            msg = "There was no user logged in. ";
        }

        window.sessionStorage.removeItem('jwt');
        setState({ loading: false, error: thereWasError, msg: msg + "You are not logged in!", isLoggedOk: false });
        setSession(SessionDefaultValue);
    }, [setState, setSession]);


    return {
        isLoggedOk: state.isLoggedOk,
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        msg: state.msg,
        login,
        logout,
    }
}