import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import * as StateConfig from '../../domain.config';
import { IAuthClient } from '../../service/auth-client.interface';
import { INotificationClient } from '../../service/notification-client.interface';
import { Base64 } from 'js-base64';
import { IUserClient } from '../../service/user-client.interface';

/**
 * use Register Confirm Email
 * Custom Hook to confirm email and to close the registration process.
 */
export default function useRegisterConfirmEmail(authServiceInjected: IAuthClient | null = null,
    userClientInjected: IUserClient | null = null) {

    const { session, setSessionValue, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ executed: false, loading: false, confirmed: false, error: false, msg: '' });
    const authService: IAuthClient = authServiceInjected ? authServiceInjected : StateConfig.authorizationClient;
    const userClient: IUserClient = userClientInjected ? userClientInjected : StateConfig.userClient;

    /**
     * Decode Token
     * Decode process: Base64 encoded --> `email|createdTimestamp` --> [email,createdTimestamp]
     *         const partsArray = decodeToken(token);
        const decodedEmail = partsArray[0];
        const decodedCode = partsArray[1];
     * @param token Base64 encoded string
     * @returns string[]
     */
    const decodeToken = (token: string): string[] => {
        const dencodedToken = Base64.decode(token);
        console.log("dencoded:", dencodedToken);
        var partsArray = dencodedToken.split('|');
        return partsArray;
    };

    /**
     * Validate Email
     * End Confirm Email function in registration process.
     * If the token is correct, then update email confirmation field in user to true.
     * @param token Base64 encoded string
     */
    const validateEmail = useCallback((token: string) => {

        //const partsArray = decodeToken(token);
        //const decodedEmail = partsArray[0];
        //const decodedCode = partsArray[1];

        setState({ executed: true, loading: true, confirmed: false, error: false, msg: "No verificado" });

        // First: obtains admin access token
        const responseAdminToken: Promise<any> = authService.getAdminTokenService();

        responseAdminToken.then(jwtAdminToken => {
            // Second: verify token
            //isVerificationCodeOk

            const responseValidation: Promise<any> = userClient.confirmAccount(token, jwtAdminToken);

            responseValidation.then(resp => { //Confirmed
                
                console.log("validateEmail, resp:", resp);
                const infoConfirmedAccountSuccess = "register.confirm.success.account.confirmed";
                setState({ executed: true, loading: false, confirmed: true, error: false, msg: infoConfirmedAccountSuccess });

            }).catch(err => {
                // Error: verification code not validated
                const e = "Error: verification code not validated.";
                setState({ executed: true, loading: false, confirmed: false, error: true, msg: e });
            });

        }).catch(err => {
            // Error Can not acquire Admin token from service
            const errorCannotGetAdminToken = err.message + " Error Can not acquire Admin token from service.";
            setState({ executed: true, loading: false, confirmed: false, error: true, msg: errorCannotGetAdminToken });
        });

    }, []);

    return {
        executed: state.executed,
        loading: state.loading,
        confirmed: state.confirmed,
        error: state.error,
        msg: state.msg,
        validateEmail,
    };
};
