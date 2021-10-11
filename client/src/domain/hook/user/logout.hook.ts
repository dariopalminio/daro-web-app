import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import { SessionType } from '../../model/user/session.type';
import * as StateConfig from '../../domain.config';
import { IAuthService } from '../../service/auth.service.interface';

/**
 * use Logout 
 * 
 * Custom Hook
 * 
 * @returns 
 *      isLogged: Boolean
 *      hasLoginError: string
 *      msg: string
 *      login function
 *      logout function
 */
export default function useLogout(authServiceInjected: IAuthService | null = null) {
    const { removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ loading: false, error: false, msg: '', isLoggedOk: false });
    const authService: IAuthService = authServiceInjected ? authServiceInjected : StateConfig.authorizationService;

    /**
     * logout function
     */
    const logout = useCallback((loggedUser: SessionType | undefined) => {
        setState({ loading: true, error: false, msg: "Trying to logout!", isLoggedOk: true })

        const userId = loggedUser?.userId ? loggedUser?.userId : null;
        let msg = "";
        let thereWasError = false;

        if (userId !== null) {

            // First: obtains admin access token
            const responseAdminToken: Promise<any> = authService.getAdminTokenService();

            responseAdminToken.then(jwtAdminToken => {
                // Second: logoutService
                const responseLogout = authService.logoutService(userId, jwtAdminToken);

                responseLogout.then(status => {

                    msg = "Closed session. ";
                }).catch(err => {
                    thereWasError = true;
                    msg = "Logout fail in API." + err.message;
                });

            }).catch(err => {
                thereWasError = true;
                msg = err.message;
            });

        } else {
            thereWasError = true;
            msg = "There was no user logged in. ";
        };

        setState({ loading: false, error: thereWasError, msg: msg + "You are not logged in!", isLoggedOk: false });
        removeSessionValue();
    }, [setState, removeSessionValue, authService]);

    return {
        isLoggedOk: state.isLoggedOk,
        isLogoutLoading: state.loading,
        hasLogoutError: state.error,
        msg: state.msg,
        logout,
    };
};