import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import * as StateConfig from '../../domain.config';
import { IAuthService } from '../../service/auth-service.interface';
import { IUserService } from '../../service/user-service.interface';
import { Base64 } from 'js-base64';
import { truncate } from 'node:fs';

/**
 * use Register Confirm Start
 * Custom Hook to start the confirm email process.
 */
export default function useRegisterConfirmStart(authServiceInjected: IAuthService | null = null,
    userServiceInjected: IUserService | null = null) {

    const { session } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: false, confirmMsg: '', wasConfirmedOk: false, redirect: false });
    const authService: IAuthService = authServiceInjected ? authServiceInjected : StateConfig.authorizationService;
    const userService: IUserService = userServiceInjected ? userServiceInjected : StateConfig.userService;


    /**
     * Start Confirm Email function
     * Sent notification by email with verification link.
     */
    const startConfirmEmail = useCallback((userName: string, userEmail: string) => {

        setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: true, error: false, confirmMsg: "Trying to send Email to Confirm!", wasConfirmedOk: false , redirect:false});console.log();
        
        console.log("session:",session);
        const verificationPageLink = `${StateConfig.app_url}/user/register/confirm/`;


        // First: obtains admin access token
        const responseAdminToken: Promise<any> = authService.getAdminTokenService();

        responseAdminToken.then(jwtAdminToken => {
            // Second: send email
            userService.sendStartEmailConfirm(userName, userEmail, verificationPageLink, jwtAdminToken).then(info => {
                console.log("Response sendStartEmailConfirm...", info);
                setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: false, confirmMsg: "register.command.email.sent", wasConfirmedOk: false, redirect: true });
             
            })
                .catch(err => {
                    setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: true, confirmMsg: "register.error.email-does-not-sent", wasConfirmedOk: false, redirect: false });
                });

        }).catch(err => {
            // Error Can not acquire Admin token from service
            const errorMsgKey = "register.error.cannot.acquire.token";
            setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: true, confirmMsg: errorMsgKey, wasConfirmedOk: false, redirect: false });
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