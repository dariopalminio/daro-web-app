import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../context/session.context';
import { SessionType } from '../model/user/session.type';
import * as StateConfig from '../domain.config';
import { IAuthService } from '../service/auth.service.interface';
import { INotificationService } from '../service/notification.service.interface';




/**
 * use Register Confirm
 * Custom Hook to confirm email and to close the registration process.
 * 
 */
export default function useRegisterConfirm(authServiceInjected: IAuthService | null = null,
    notifServiceInjected: INotificationService | null = null) {

    const { session, setSessionValue, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: false, msg: '', wasConfirmedOk: false });
    const authService: IAuthService = authServiceInjected ? authServiceInjected : StateConfig.authorizationService;
    const notifService: INotificationService = notifServiceInjected ? notifServiceInjected : StateConfig.notificationService;

    /**
     * Returns a random 6-digit code as a string
     * @returns 
     */
    const getRandomMasterCode = () => {
        const randomNumberAsString = (new String(Math.random())).replace('.', '0');
        const sixDigits = randomNumberAsString.substring(randomNumberAsString.length, randomNumberAsString.length-6);
        return sixDigits;
    };

    /**
     * Start Confirm Email function
     * Sent code notification by email
     */
    const startConfirmEmail = useCallback((userName: string, userEmail: string) => {

        setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: false, msg: "Trying to send Email to Confirm!", wasConfirmedOk: false });console.log();
        
        console.log("session:",session);


        const masterCode = getRandomMasterCode();

        // First: obtains admin access token
        const responseAdminToken: Promise<any> = authService.getAdminTokenService();

        responseAdminToken.then(jwtAdminToken => {
            // Second: send email
            notifService.sendStartEmailConfirm(userName, userEmail, masterCode, jwtAdminToken).then(info => {
                console.log("Response sendStartEmailConfirm...", info);
                setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: false, msg: "Sent Email with verification code!", wasConfirmedOk: false });
             
            })
                .catch(err => {
                    setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: true, msg: "the email could not be sent with the verification code!", wasConfirmedOk: false });
                });

        }).catch(err => {
            // Error Can not acquire Admin token from service
            const errorText = err.message + " Error Can not acquire Admin token from service."
            setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: true, msg: errorText, wasConfirmedOk: false });
            //removeSessionValue();
        });

        return masterCode;
    
        }, [session]);

    const validateVerificationCode = useCallback((codeEntered: string, masterCode: string) => {
        if (codeEntered == masterCode) {
            setState({ validVerificationCode: true, validVerificationCodeMsg: 'Code verified!', loading: false, error: false, msg: '', wasConfirmedOk: false });
            return true;
          }
        setState({ validVerificationCode: false, validVerificationCodeMsg: 'Invalid code!', loading: false, error: false, msg: '', wasConfirmedOk: false });
        return false;
    }, []);

    /**
     * End Confirm Email function
     * Update email confirmation field in user to true
     */
    const endConfirmEmail = useCallback(() => {

        setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: true, error: false, msg: "Trying to Email Confirm!", wasConfirmedOk: false });

        const userId = (session?.userId)? (session?.userId) : '';
        const userEmail = (session?.email)? (session?.email) : '';

        // First: obtains admin access token
        const responseAdminToken: Promise<any> = authService.getAdminTokenService();

        
        responseAdminToken.then(jwtAdminToken => {
            // Second: update email confirmation field in user
            const responseConfirm = authService.confirmEmailService(
                userId,
                userEmail,
                jwtAdminToken);

                responseConfirm.then(status => {
                const msgText = status + " Your account has been created and confirm successfully. Now you can log in.";
                setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: false, msg: msgText, wasConfirmedOk: true });
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
                setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: true, msg: err.message, wasConfirmedOk: false });
                removeSessionValue();
            });

        }).catch(err => {
            // Error Can not acquire Admin token from service
            const errorText = err.message + " Error Can not acquire Admin token from service."
            setState({ validVerificationCode: false, validVerificationCodeMsg: '', loading: false, error: true, msg: errorText, wasConfirmedOk: false });
            removeSessionValue();
        });

    }, [setState, setSessionValue, removeSessionValue, authService]);


    return {
        validVerificationCode: state.validVerificationCode,
        validVerificationCodeMsg: state.validVerificationCodeMsg,
        wasConfirmedOk: state.wasConfirmedOk,
        isRegisterLoading: state.loading,
        hasRegisterError: state.error,
        msg: state.msg,
        validateVerificationCode,
        startConfirmEmail,
        endConfirmEmail,
        getRandomMasterCode,
    };
};