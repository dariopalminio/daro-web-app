import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import { SessionType } from '../../model/user/session.type';
import * as StateConfig from '../../domain.config';
import { IAuthTokensClient } from '../../service/auth-tokens-client.interface';
import { IAuthClient } from '../../service/auth-client.interface';

/**
 * use Register
 * Custom Hook for create new user
 */
export default function useRegister(authServiceInjected: IAuthTokensClient | null = null,
    userClientInjected: IAuthClient | null = null) {

    const { session, setSessionValue, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ isProcessing: false, isSuccess: false, hasError: false, msg: '' });
    const authTokenService: IAuthTokensClient = authServiceInjected ? authServiceInjected : StateConfig.authorizationClient;
    const authClient: IAuthClient = userClientInjected ? userClientInjected : StateConfig.userClient;

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

        // First: obtains admin access token
        const responseAdminToken: Promise<any> = authTokenService.getAdminTokenService();

        // Second: creates a new user with authorization using admin access token
        responseAdminToken.then(jwtAdminToken => {

            const responseReg = authClient.register(
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
                        setState({ isProcessing: false, hasError: false, msg: "", isSuccess: true });

            }).catch(err => {
                console.log("Error: Request failed with status code 409 (Conflict) or 400 (Bad Request) or 403 Forbidden!");
                setState({ isProcessing: false, hasError: true, msg: err.message, isSuccess: false });
                removeSessionValue();
            });

        }).catch(err => {
            console.log("Error Can not acquire Admin token from service!");
            const errorMsgKey = "register.error.cannot.acquire.token";
            setState({ isProcessing: false, hasError: true, msg: errorMsgKey, isSuccess: false });
            removeSessionValue();
        });

    }, [setState, setSessionValue, removeSessionValue, authTokenService, authClient]);

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

            console.log("session:", session);
            const verificationPageLink = `${StateConfig.app_url}/user/register/confirm/`;


            // First: obtains admin access token
            const responseAdminToken: Promise<any> = authTokenService.getAdminTokenService();

            responseAdminToken.then(jwtAdminToken => {
                // Second: send email to confirmation process
                authClient.sendStartEmailConfirm(userName, email, verificationPageLink, locale, jwtAdminToken).then(info => {
                    console.log("Response sendStartEmailConfirm...", info);
                    setState({ isProcessing: false, hasError: false, msg: "register.command.email.sent", isSuccess: true });

                })
                    .catch(err => {
                        // Error Can not send email
                        setState({ isProcessing: false, hasError: true, msg: "register.error.email-does-not-sent", isSuccess: false });
                    });

            }).catch(err => {
                // Error Can not acquire Admin token from service
                const errorMsgKey = "register.error.cannot.acquire.token";
                setState({ isProcessing: false, hasError: true, msg: errorMsgKey, isSuccess: false });
                //removeSessionValue();
            });
        }
    }, [session, authClient, authTokenService]);

       /**
     * Validate Email
     * End Confirm Email function in registration process.
     * If the token is correct, then update email confirmation field in user to true.
     * @param token Base64 encoded string
     */
        const confirmAccount = useCallback((token: string, lang: string) => {


            setState({ isProcessing: true, isSuccess: false, hasError: false, msg: "No verificado" });
    
            // First: obtains admin access token
            const responseAdminToken: Promise<any> = authTokenService.getAdminTokenService();
    
            responseAdminToken.then(jwtAdminToken => {
                // Second: verify token
                //isVerificationCodeOk
    
                const responseValidation: Promise<any> = authClient.confirmAccount(token, lang, jwtAdminToken);
    
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
    
            }).catch(err => {
                // Error Can not acquire Admin token from service
                const errorCannotGetAdminToken = err.message + " Error Can not acquire Admin token from service.";
                setState({ isProcessing: false, isSuccess: false, hasError: true, msg: errorCannotGetAdminToken });
            });
    
        }, [authClient, authTokenService]);

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