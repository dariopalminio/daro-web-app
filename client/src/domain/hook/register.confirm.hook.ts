import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../context/session.context';
import { SessionType } from '../model/user/session.type';
import * as StateConfig from '../domain.config';
import { IAuthService } from '../service/auth.service.interface';
import { INotificationService } from '../service/notification.service.interface';
import { Base64 } from 'js-base64';



/**
 * use Register Confirm
 * Custom Hook to confirm email and to close the registration process.
 * 
 */
export default function useRegisterConfirm(authServiceInjected: IAuthService | null = null,
    notifServiceInjected: INotificationService | null = null) {

    const { session, setSessionValue, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: false, msg: '', wasConfirmedOk: false, redirect: false });
    const authService: IAuthService = authServiceInjected ? authServiceInjected : StateConfig.authorizationService;
    const notifService: INotificationService = notifServiceInjected ? notifServiceInjected : StateConfig.notificationService;

    /**
     * `user@domain|createdTimestamp` -> Base64 encoded
     * @param token 
     * @returns 
     */
    const encodeToken = (email: string, createdTimestamp: string): string => {
        const concatenated =  email + '|' + createdTimestamp;
        const encodedToken = Base64.encode(concatenated);
        return encodedToken;
    };

    //http://localhost:3000/confirm/ZGFyaW9wYWxtaW5pb0BnbWFpbC5jb218MTYzMTkzNDkxODgxNw==

    const encodeLink = (token: string): string => {
        const url = `http://localhost:3000/confirm/${token}`;
        return url;
    };

    /**
     * Start Confirm Email function
     * Sent code notification by email
     */
    const startConfirmEmail = useCallback((userName: string, userEmail: string) => {

        setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: false, msg: "Trying to send Email to Confirm!", wasConfirmedOk: false , redirect:false});console.log();
        
        console.log("session:",session);

        let createdTimestamp: string = "";
        if (session?.createdTimestamp){
            createdTimestamp = session?.createdTimestamp;
        }else{
            const errorText = "createdTimestamp does not exist!"
            setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: true, msg: errorText, wasConfirmedOk: false, redirect:false});
            return;
        }

        const token: string = encodeToken(userEmail, createdTimestamp);
        const verificationLink = encodeLink(token);

        // First: obtains admin access token
        const responseAdminToken: Promise<any> = authService.getAdminTokenService();

        responseAdminToken.then(jwtAdminToken => {
            // Second: send email
            notifService.sendStartEmailConfirm(userName, userEmail, verificationLink, jwtAdminToken).then(info => {
                console.log("Response sendStartEmailConfirm...", info);
                setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: false, msg: "Sent Email with verification code!", wasConfirmedOk: false, redirect: true });
             
            })
                .catch(err => {
                    setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: true, msg: "the email could not be sent with the verification code!", wasConfirmedOk: false, redirect: false });
                });

        }).catch(err => {
            // Error Can not acquire Admin token from service
            const errorText = err.message + " Error Can not acquire Admin token from service."
            setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: true, msg: errorText, wasConfirmedOk: false, redirect: false });
            //removeSessionValue();
        });
    
        }, [session]);

    return {
        validVerificationCode: state.validVerificationCode,
        validVerificationCodeMsg: state.validVerificationCodeMsg,
        wasConfirmedOk: state.wasConfirmedOk,
        isRegisterLoading: state.loading,
        hasRegisterError: state.error,
        msg: state.msg,
        redirect: state.redirect,
        startConfirmEmail,
    };
};