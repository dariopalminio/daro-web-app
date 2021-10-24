import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import * as StateConfig from '../../domain.config';
import { IAuthService } from '../../service/auth-service.interface';
import { INotificationService } from '../../service/notification-service.interface';
import { Base64 } from 'js-base64';
import { truncate } from 'node:fs';

/**
 * use Register Confirm Start
 * Custom Hook to start the confirm email process.
 */
export default function useRegisterConfirmStart(authServiceInjected: IAuthService | null = null,
    notifServiceInjected: INotificationService | null = null) {

    const { session } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: false, confirmMsg: '', wasConfirmedOk: false, redirect: false });
    const authService: IAuthService = authServiceInjected ? authServiceInjected : StateConfig.authorizationService;
    const notifService: INotificationService = notifServiceInjected ? notifServiceInjected : StateConfig.notificationService;

    /**
     * Encode Token
     * Encode the token for the email confirmation link
     * as `email|createdTimestamp` -> Base64 encoded
     * @param token 
     * @returns 
     */
    const encodeToken = (email: string, createdTimestamp: string): string => {
        const concatenated =  email + '|' + createdTimestamp;
        const encodedToken = Base64.encode(concatenated);
        return encodedToken;
    };

    /**
     * Encode Link
     * Create a url made up of the union between the url of the confirmation page and the token.
     * The result is similar to: 'http://localhost:3000/confirm/ZGFyaW9wYWxtaW5pb0BnbWFpbC5jb218MTYzMTkzNDkxODgxNw=='
     * @param token 
     * @returns string with formatt follow app_url/confirm/token
     */
    const createLink = (token: string): string => {
        const url = `${StateConfig.app_url}/user/register/confirm/${token}`;
        return url;
    };

    /**
     * Start Confirm Email function
     * Sent notification by email with verification link.
     */
    const startConfirmEmail = useCallback((userName: string, userEmail: string) => {

        setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: true, error: false, confirmMsg: "Trying to send Email to Confirm!", wasConfirmedOk: false , redirect:false});console.log();
        
        console.log("session:",session);

        let createdTimestamp: string = "";
        if (session?.createdTimestamp){
            createdTimestamp = session?.createdTimestamp;
        }else{
            const errorText = "createdTimestamp does not exist!"
            setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: true, confirmMsg: errorText, wasConfirmedOk: false, redirect:false});
            return;
        }

        const verificationLink = `${StateConfig.app_url}/user/register/confirm/`;
        //const token: string = encodeToken(userEmail, createdTimestamp);
        //const verificationLink = createLink(token);

        // First: obtains admin access token
        const responseAdminToken: Promise<any> = authService.getAdminTokenService();

        responseAdminToken.then(jwtAdminToken => {
            // Second: send email
            authService.sendStartEmailConfirm(userName, userEmail, verificationLink, jwtAdminToken).then(info => {
                console.log("Response sendStartEmailConfirm...", info);
                setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: false, confirmMsg: "Sent Email with verification code!", wasConfirmedOk: false, redirect: true });
             
            })
                .catch(err => {
                    setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: true, confirmMsg: "the email could not be sent with the verification code!", wasConfirmedOk: false, redirect: false });
                });

        }).catch(err => {
            // Error Can not acquire Admin token from service
            const errorText = err.message + " Error Can not acquire Admin token from service. Contact your site administrator."
            setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: true, confirmMsg: errorText, wasConfirmedOk: false, redirect: false });
            //removeSessionValue();
        });
    
        }, [session]);

    return {
        validVerificationCode: state.validVerificationCode,
        validVerificationCodeMsg: state.validVerificationCodeMsg,
        wasConfirmedOk: state.wasConfirmedOk,
        isRegisterLoading: state.loading,
        hasRegisterError: state.error,
        confirmMsg: state.confirmMsg,
        redirect: state.redirect,
        startConfirmEmail,
    };
};