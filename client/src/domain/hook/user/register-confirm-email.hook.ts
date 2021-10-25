import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import * as StateConfig from '../../domain.config';
import { IAuthService } from '../../service/auth-service.interface';
import { INotificationService } from '../../service/notification-service.interface';
import { Base64 } from 'js-base64';
import { IUserService } from '../../service/user-service.interface';

/**
 * use Register Confirm Email
 * Custom Hook to confirm email and to close the registration process.
 */
export default function useRegisterConfirmEmail(authServiceInjected: IAuthService | null = null,
    userServiceInjected: IUserService | null = null) {

    const { session, setSessionValue, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ executed: false, loading: false, confirmed: false, error: false, msg: '' });
    const authService: IAuthService = authServiceInjected ? authServiceInjected : StateConfig.authorizationService;
    const userService: IUserService = userServiceInjected ? userServiceInjected : StateConfig.userService;

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

            const responseValidation: Promise<any> = userService.isVerificationCodeOk(token, jwtAdminToken);

            responseValidation.then(resp => {
                console.log("isVerificationCodeOk --> resp:", resp);
                const decodedEmail = resp.email;
                // get user by email from auth server
                const responseGetUser = authService.getUserByEmailService(
                    decodedEmail,
                    jwtAdminToken);

                responseGetUser.then(data => {

                    if (!data[0]) {
                        // keycloak.error.user-not-exist
                        const errorUserNotFound = "User not found."; //keycloak.error.user-not-exist
                        setState({ executed: true, loading: false, confirmed: false, error: true, msg: errorUserNotFound });
                        removeSessionValue();
                    } else { // keycloak ok because user-exist
                        const userId: string = data[0].id;
                        const masterCreatedTimestamp: string = data[0].createdTimestamp;

                        //isVerificationCodeOk
                        const isVerificationCodeOkResult = true;


                        if (isVerificationCodeOkResult == true) {

                            // update email confirmation field in user of auth server
                            const responseConfirm = authService.confirmEmailService(
                                userId,
                                decodedEmail,
                                jwtAdminToken);

                            responseConfirm.then(status => {
                                console.log("validateEmail, status:", status);
                                const infoConfirmedAccountSuccess = "Your account has been created and confirm successfully. Now you can log in.";
                                setState({ executed: true, loading: false, confirmed: true, error: false, msg: infoConfirmedAccountSuccess });
                            }).catch(err => {
                                // Error
                                setState({ executed: true, loading: false, confirmed: false, error: true, msg: err.message });
                            });

                        } else {
                            const errorVerificationCodeIsWrong = "Dont exist! Codes do not match."; //decodedCreatedTimestamp not match
                            setState({ executed: true, loading: false, confirmed: false, error: true, msg: errorVerificationCodeIsWrong });
                        }
                        console.log("data[0]:", data[0]);

                    }
                }).catch(err => {
                    // Error when get user
                    const errorCannotGetUser = "Error when get user.";
                    setState({ executed: true, loading: false, confirmed: false, error: true, msg: errorCannotGetUser });
                });

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
