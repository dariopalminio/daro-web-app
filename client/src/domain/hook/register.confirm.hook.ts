import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../context/session.context';
import { SessionType } from '../model/user/session.type';
import * as StateConfig from '../domain.config';
import { IAuthService } from '../service/auth.service.interface';

/**
 * use Register Confirm
 * Custom Hook to confirm email and to close the registration process
 */
export default function useRegisterConfirm(authServiceInjected: IAuthService | null = null) {

    const { session, setSessionValue, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ loading: false, error: false, msg: '', wasConfirmedOk: false });
    const authService: IAuthService = authServiceInjected ? authServiceInjected : StateConfig.authorizationService;
    
    /**
     * Confirm Email function
     */
    const confirmEmail = useCallback(() => {

        setState({ loading: true, error: false, msg: "Trying to Email Confirm!", wasConfirmedOk: false });

        const userId = (session?.userId)? (session?.userId) : '';
        const userEmail = (session?.email)? (session?.email) : '';

        // First: obtains admin access token
        const responseAdminToken: Promise<any> = authService.getAdminTokenService();

        // Second: creates a new user with authorization using admin access token
        responseAdminToken.then(jwtAdminToken => {

            const responseConfirm = authService.confirmEmailService(
                userId,
                userEmail,
                jwtAdminToken);

                responseConfirm.then(status => {
                const msgText = status + " Your account has been created and confirm successfully. Now you can log in.";
                setState({ loading: false, error: false, msg: msgText, wasConfirmedOk: true });
                const userValue: SessionType = {
                    access_token: null,
                    refresh_token: null,
                    expires_in: 0,
                    refresh_expires_in: 0,
                    date: new Date(),
                    isLogged: false,
                    isRegistered: true,
                    email: userEmail,
                    email_verified: true,
                    given_name: "",
                    preferred_username: "",
                    userId: userId,
                };
                setSessionValue(userValue);
            }).catch(err => {
                // Request failed with status code 409 (Conflict) or 400 (Bad Request)
                setState({ loading: false, error: true, msg: err.message, wasConfirmedOk: false });
                removeSessionValue();
            });

        }).catch(err => {
            // Error Can not acquire Admin token from service
            const errorText = err.message + " Error Can not acquire Admin token from service."
            setState({ loading: false, error: true, msg: errorText, wasConfirmedOk: false });
            removeSessionValue();
        });

    }, [setState, setSessionValue, removeSessionValue, authService]);


    return {
        wasConfirmedOk: state.wasConfirmedOk,
        isRegisterLoading: state.loading,
        hasRegisterError: state.error,
        msg: state.msg,
        confirmEmail,
    };
};