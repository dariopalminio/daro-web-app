import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../context/session.context';
import * as StateConfig from '../domain.config';
import { IAuthService } from '../service/auth.service.interface';
import { INotificationService } from '../service/notification.service.interface';
import { Base64 } from 'js-base64';


/**
 * use Register Confirm Email
 * Custom Hook to confirm email and to close the registration process.
 */
export default function useRegisterConfirmEmail(authServiceInjected: IAuthService | null = null,
    notifServiceInjected: INotificationService | null = null) {

    const { session, setSessionValue, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ verified: 'loading', loading: false, error: false, msg: '' });
    const authService: IAuthService = authServiceInjected ? authServiceInjected : StateConfig.authorizationService;
    const notifService: INotificationService = notifServiceInjected ? notifServiceInjected : StateConfig.notificationService;


    /**
     * `user@domain|createdTimestamp`
     * @param token 
     * @returns 
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
     */
    const validateEmail = useCallback((token: string) => {

        const partsArray = decodeToken(token);
        const decodedEmail = partsArray[0];
        const decodedCreatedTimestamp = partsArray[1];

        setState({ verified: 'loading', loading: true, error: false, msg: "No verificado" });

        // First: obtains admin access token
        const responseAdminToken: Promise<any> = authService.getAdminTokenService();

        // Second: creates a new user with authorization using admin access token
        responseAdminToken.then(jwtAdminToken => {

            const responseGetUser = authService.getUserByEmailService(
                decodedEmail,
                jwtAdminToken);

            responseGetUser.then(data => {

                if (!data[0]) {
                    // keycloak.error.user-not-exist
                    setState({ verified: 'false', loading: true, error: true, msg: "keycloak.error.user-not-exist" });
                    removeSessionValue();
                } else { // keycloak ok because user-exist
                    const userId: string = data[0].id;
                    const masterCreatedTimestamp: string = data[0].createdTimestamp;
                    if (decodedCreatedTimestamp == String(masterCreatedTimestamp)) {
                        const msgText = " Your account has been created successfully. Now you can log in.";

                        // Second: update email confirmation field in user of auth server
                        const responseConfirm = authService.confirmEmailService(
                            userId,
                            decodedEmail,
                            jwtAdminToken);

                        responseConfirm.then(status => {
                            console.log("validateEmail, status:", status);
                            const msgText = "Your account has been created and confirm successfully. Now you can log in.";
                            setState({ verified: 'true', loading: true, error: false, msg: msgText });

                        }).catch(err => {
                            // Error
                            setState({ verified: 'false', loading: true, error: true, msg: err.message });
                        });



                    } else {
                        console.log("MAL!!!");
                        setState({ verified: 'false', loading: true, error: true, msg: "Dont exist!" });
                    }
                    console.log("data[0]:", data[0]);

                }
            }).catch(err => {
                // Error when get user
                setState({ verified: 'false', loading: true, error: true, msg: "Error when get user" });
            });


        }).catch(err => {
            // Error Can not acquire Admin token from service
            const errorText = err.message + " Error Can not acquire Admin token from service."
            setState({ verified: 'false', loading: true, error: true, msg: errorText });

        });

    }, []);


    return {
        verified: state.verified,
        loading: state.loading,
        error: state.error,
        msg: state.msg,
        validateEmail,
    };
};