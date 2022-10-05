import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from 'domain/context/session.context';
import { SessionType } from 'domain/model/auth/session.type';
import * as StateConfig from 'infra/global.config';
import { IAuthTokensClient } from 'domain/service/auth-tokens-client.interface';
import { IAuthClient } from 'domain/service/auth-client.interface';
import { IHookState, InitialState } from 'domain/hook/hook.type';
import { convertJwtToSessionType } from './convert-jwt';
import { IProfileClient } from 'domain/service/profile-client.interface';
import { Profile } from 'domain/model/user/profile.type';

/**
 * use Register
 * Custom Hook for create new user
 */
export default function useRegister(authServiceInjected: IAuthTokensClient | null = null,
    userClientInjected: IAuthClient | null = null,
    profileClientInjected: IProfileClient | null = null) {

    const { session, setNewSession, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState<IHookState>(InitialState);
    const authClient: IAuthClient = userClientInjected ? userClientInjected : StateConfig.userAuthClient;
    const profClient: IProfileClient = profileClientInjected ? profileClientInjected : StateConfig.profileClient;


    /**
     * Register function
     * Create new user in registration process.
     */
    const register = async (firstname: string, lastname: string, email: string, password: string) => {
        console.log("useRegister->register");
        setState({ isProcessing: true, hasError: false, msg: "register.info.loading", isSuccess: false });

        // creates a new user with authorization using admin access token
        try {
            const data = await authClient.register(
                email,
                firstname,
                lastname,
                email,
                password);
            console.log("Register response promise then:", data);
            const userSessionValue: SessionType = convertJwtToSessionType(data);

            //mover la creación de profile al server o buscar otra estrategia
            const newProf = {
                userId: userSessionValue.userId,
                userName: userSessionValue.preferred_username,
                firstName: userSessionValue.firstName,
                lastName: userSessionValue.lastName,
                email: userSessionValue.email,
                docType: '',
                document: '',
                telephone: '',
                language: '',
                addresses: []
            };
            const res = await profClient.createProfile(newProf);

            setNewSession(userSessionValue);
            setState({ isProcessing: false, hasError: false, msg: "", isSuccess: true });

        } catch (err: any) {
            console.log("Error Can not acquire Admin token from service!");
            const errorMsgKey = "register.error.cannot.acquire.token";
            setState({ isProcessing: false, hasError: true, msg: errorMsgKey, isSuccess: false });
            removeSessionValue();
        };

    };

    /**
      * Start Confirm Email function
      * Sent notification by email with verification link.
      */
    const startConfirmEmail = async (userName: string, userEmail: string | undefined, locale: string) => {
        console.log("useRegister->startConfirmEmail");
        if (!userEmail) {
            const errorMsg = "Some problem creating new user. Email does not exist in session!";
            setState({ isProcessing: true, hasError: true, msg: errorMsg, isSuccess: false }); console.log();
        } else {

            const email: string = userEmail;
            setState({ isProcessing: true, hasError: false, msg: "Trying to send Email to Confirm!", isSuccess: false }); console.log();
            try {
                console.log("startConfirmEmail logged:", session);
                const verificationPageLink = `${StateConfig.app_url}/user/register/confirm/`;

                // Second: send email to confirmation process
                const info = await authClient.sendStartEmailConfirm(userName, email, verificationPageLink, locale);

                console.log("Response sendStartEmailConfirm...", info);
                setState({ isProcessing: false, hasError: false, msg: "register.command.email.sent", isSuccess: true });

            } catch (err: any) {
                // Error Can not send email
                setState({ isProcessing: false, hasError: true, msg: "register.error.email-does-not-sent", isSuccess: false });
            }
        }
    };

    /**
  * Validate Email
  * End Confirm Email function in registration process.
  * If the token is correct, then update email confirmation field in user to true.
  * @param token Base64 encoded string
  */
    const confirmAccount = async (token: string, lang: string) => {
        console.log("confirmAccount");

        setState({ isProcessing: true, isSuccess: false, hasError: false, msg: "No verificado" });
        try {
            const responseValidation = await authClient.confirmAccount(token, lang);

            console.log("validateEmail, resp:", responseValidation);
            const infoConfirmedAccountSuccess = "register.confirm.success.account.confirmed";
            setState({ isProcessing: false, isSuccess: true, hasError: false, msg: infoConfirmedAccountSuccess });

        } catch (err: any) {
            // Error: verification code not validated
            console.log("err:", err);
            const e = "Error: verification code not validated.";
            setState({ isProcessing: false, isSuccess: false, hasError: true, msg: e });
        }

    };

    return {
        isSuccess: state.isSuccess,
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        register,
        startConfirmEmail,
        confirmAccount
    }
};