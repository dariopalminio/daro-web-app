import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import * as StateConfig from '../../domain.config';
import { IAuthTokensClient } from '../../service/auth-tokens-client.interface';
import { IUserClient } from '../../service/user-client.interface';
import { Base64 } from 'js-base64';
import { truncate } from 'node:fs';

/**
 * use Register Confirm Start
 * Custom Hook to start the confirm email process.
 */
export default function useRegisterConfirmStart(authServiceInjected: IAuthTokensClient | null = null,
    userClientInjected: IUserClient | null = null) {

    const { session } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: false, confirmMsg: '', wasConfirmedOk: false, redirect: false });
    const authTokenService: IAuthTokensClient = authServiceInjected ? authServiceInjected : StateConfig.authorizationClient;
    const userClient: IUserClient = userClientInjected ? userClientInjected : StateConfig.userClient;


    /**
     * Start Confirm Email function
     * Sent notification by email with verification link.
     */
    const startConfirmEmail = useCallback((userName: string, userEmail: string | undefined) => {

        if (!userEmail) {
            const errorMsg = "Some problem creating new user. Email does not exist in session!";
            setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: true, error: true, confirmMsg: errorMsg, wasConfirmedOk: false, redirect: false }); console.log();
        } else {

            const email: string = userEmail;
            setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: true, error: false, confirmMsg: "Trying to send Email to Confirm!", wasConfirmedOk: false, redirect: false }); console.log();

            console.log("session:", session);
            const verificationPageLink = `${StateConfig.app_url}/user/register/confirm/`;


            // First: obtains admin access token
            const responseAdminToken: Promise<any> = authTokenService.getAdminTokenService();

            responseAdminToken.then(jwtAdminToken => {
                // Second: send email to confirmation process
                userClient.sendStartEmailConfirm(userName, email, verificationPageLink, jwtAdminToken).then(info => {
                    console.log("Response sendStartEmailConfirm...", info);
                    setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: false, confirmMsg: "register.command.email.sent", wasConfirmedOk: false, redirect: true });

                })
                    .catch(err => {
                        // Error Can not send email
                        setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: true, confirmMsg: "register.error.email-does-not-sent", wasConfirmedOk: false, redirect: false });
                    });

            }).catch(err => {
                // Error Can not acquire Admin token from service
                const errorMsgKey = "register.error.cannot.acquire.token";
                setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: true, confirmMsg: errorMsgKey, wasConfirmedOk: false, redirect: false });
                //removeSessionValue();
            });
        }
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