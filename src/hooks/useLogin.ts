import { useCallback, useContext, useState } from 'react';
import UserContext, { UserContextType, UserType, UserDefaultValue } from '../context/UserContext';
import loginService from '../services/user/LoginService';
import getAdminTokenService from '../services/user/GetAdminTokenService';
import getUserInfoService from '../services/user/GetUserInfoService';
import logoutService from '../services/user/LogoutService';

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
    const { user, setUser } = useContext(UserContext) as UserContextType;
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
                    window.sessionStorage.setItem('jwt', jwt);
                    setState({ loading: false, error: false, msg: "Authorized", isLoggedOk: true });
                    const userValue: UserType = {
                        jwt: jwt,
                        isLogged: true,
                        isRegistered: true,
                        email: userdata.email,
                        email_verified: userdata.email_verified,
                        given_name: userdata.given_name,
                        preferred_username: userdata.preferred_username,
                        userId: userdata.sub,
                    };
                    setUser(userValue);
                }).catch(err => {
                    // Unauthorized
                    window.sessionStorage.removeItem('jwt');
                    const errMsg = err.message;
                    setState({ loading: false, error: true, msg: errMsg, isLoggedOk: false });
                    setUser(UserDefaultValue);
                })

            })
            .catch(err => {
                // Unauthorized
                window.sessionStorage.removeItem('jwt');
                setState({ loading: false, error: true, msg: err.message, isLoggedOk: false });
                setUser(UserDefaultValue);
            })
    }, [setState, setUser])

    /**
     * logout
     */
    const logout = useCallback((loggedUser: UserType | undefined) => {
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
        setUser(UserDefaultValue);
    }, [setState, setUser]);


    return {
        isLoggedOk: state.isLoggedOk,
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        msg: state.msg,
        login,
        logout,
    }
}