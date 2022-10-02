import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import { SessionType } from '../../model/auth/session.type';
import * as StateConfig from '../../../infra/global.config';
import { IAuthTokensClient } from '../../service/auth-tokens-client.interface';
import { IAuthClient } from '../../service/auth-client.interface';
import { IHookState, InitialState } from '../hook.type';

/**
 * use Register
 * Custom Hook for create new user
 */
export default function useRegister(authServiceInjected: IAuthTokensClient | null = null,
    userClientInjected: IAuthClient | null = null) {

    const { session, setNewSession, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState<IHookState>(InitialState);
    const authClient: IAuthClient = userClientInjected ? userClientInjected : StateConfig.userAuthClient;

    /**
     * Register function
     * Create new user in registration process.
     */
    const register = useCallback((
        firstname: string,
        lastname: string,
        email: string,
        password: string) => {

        setState({ isProcessing: true, hasError: false, msg: "register.info.loading", isSuccess: false });

        // creates a new user with authorization using admin access token

        const responseReg = authClient.register(
            email,
            firstname,
            lastname,
            email,
            password);

        responseReg.then(resp => {
            console.log("Register response promise then:", resp);
            const userValue: SessionType = {
                createdTimestamp: "",
                access_token: null,
                refresh_token: null,
                expires_in: 0,
                refresh_expires_in: 0,
                date: new Date(),
                isLogged: false,
                email: email,
                email_verified: false,
                given_name: firstname,
                preferred_username: firstname,
                userId: "",
                roles: []
            };

            setNewSession(userValue);
            setState({ isProcessing: false, hasError: false, msg: "", isSuccess: true });

        }).catch(err => {
            console.log("Error Can not acquire Admin token from service!");
            const errorMsgKey = "register.error.cannot.acquire.token";
            setState({ isProcessing: false, hasError: true, msg: errorMsgKey, isSuccess: false });
            removeSessionValue();
        });

    }, [setState, setNewSession, removeSessionValue, authClient]);

    /**
      * Start Confirm Email function
      * Sent notification by email with verification link.
      */
    const startConfirmEmail = useCallback((userName: string, userEmail: string | undefined, locale: string) => {

        if (!userEmail) {
            const errorMsg = "Some problem creating new user. Email does not exist in session!";
            setState({ isProcessing: true, hasError: true, msg: errorMsg, isSuccess: false }); console.log();
        } else {

            const email: string = userEmail;
            setState({ isProcessing: true, hasError: false, msg: "Trying to send Email to Confirm!", isSuccess: false }); console.log();

            console.log("startConfirmEmail logged:", session);
            const verificationPageLink = `${StateConfig.app_url}/user/register/confirm/`;

            // Second: send email to confirmation process
            authClient.sendStartEmailConfirm(userName, email, verificationPageLink, locale).then(info => {
                console.log("Response sendStartEmailConfirm...", info);
                setState({ isProcessing: false, hasError: false, msg: "register.command.email.sent", isSuccess: true });

            })
                .catch(err => {
                    // Error Can not send email
                    setState({ isProcessing: false, hasError: true, msg: "register.error.email-does-not-sent", isSuccess: false });
                });

        }
    }, [session, authClient]);

    /**
  * Validate Email
  * End Confirm Email function in registration process.
  * If the token is correct, then update email confirmation field in user to true.
  * @param token Base64 encoded string
  */
    const confirmAccount = useCallback((token: string, lang: string) => {


        setState({ isProcessing: true, isSuccess: false, hasError: false, msg: "No verificado" });

        const responseValidation: Promise<any> = authClient.confirmAccount(token, lang);

        responseValidation.then(resp => { //Confirmed

            console.log("validateEmail, resp:", resp);
            const infoConfirmedAccountSuccess = "register.confirm.success.account.confirmed";
            setState({ isProcessing: false, isSuccess: true, hasError: false, msg: infoConfirmedAccountSuccess });

        }).catch(err => {
            // Error: verification code not validated
            console.log("err:", err);
            const e = "Error: verification code not validated.";
            setState({ isProcessing: false, isSuccess: false, hasError: true, msg: e });
        });

    }, [authClient]);

    return {
        isSuccess: state.isSuccess,
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        register,
        startConfirmEmail,
        confirmAccount
    };
};