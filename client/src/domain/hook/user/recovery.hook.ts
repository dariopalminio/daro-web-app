import { useCallback, useState } from 'react';
//import SessionContext, { ISessionContext } from '../../context/session.context';
import * as StateConfig from '../../domain.config';
import { IAuthTokensClient } from '../../service/auth-tokens-client.interface';
import { IAuthClient } from '../../service/auth-client.interface';



/**
 * Start process to password recovery
 */
export default function useRecovery(authServiceInjected: IAuthTokensClient | null = null,
    userClientInjected: IAuthClient | null = null) {

    //const { session, setSessionValue, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ isProcessing: false, isSuccess: false, hasError: false, msg: '' });
    const authTokenService: IAuthTokensClient = authServiceInjected ? authServiceInjected : StateConfig.authorizationClient;
    const authClient: IAuthClient = userClientInjected ? userClientInjected : StateConfig.userClient;

    /**
     * sendEmailToRecovery
     */
    const sendEmailToRecovery = useCallback((email: string) => {

        setState({ isProcessing: true, isSuccess: false, hasError: false, msg: 'sending'  });

        if (!email) {
            const errorMsg = "Some problem creating new user. Email does not exist in session!";
            setState({ isProcessing: false, isSuccess: false, hasError: true, msg: errorMsg });
        } else {

            const recoveryPageLink = `${StateConfig.app_url}/user/recovery/form/`;

            // First: obtains admin access token
            const responseAdminToken: Promise<any> = authTokenService.getAdminTokenService();

            responseAdminToken.then(jwtAdminToken => {
                // Second: send email to confirmation process
                authClient.sendEmailToRecoveryPass(email, recoveryPageLink, jwtAdminToken)
                .then(info => {
                    console.log("Response sendStartEmailConfirm...", info);
                    setState({ isProcessing: false, isSuccess: true, hasError: false, msg: 'ok'  });

                })
                    .catch(err => {
                        // Error Can not send email
                        setState({ isProcessing: false, isSuccess: false, hasError: true, msg: "register.error.email-does-not-sent"  });
                    });

            }).catch(err => {
                // Error Can not acquire Admin token from service
                const errorMsgKey = "register.error.cannot.acquire.token";
                setState({ isProcessing: false, isSuccess: false, hasError: true, msg: errorMsgKey  });
                //removeSessionValue();
            });
        }

    }, [authClient, authTokenService]);

    const updatePassword = useCallback((token: string, password: string) => {
        setState({ isProcessing: true, isSuccess: false, hasError: false, msg: 'sending'  });

        if (!token || !password) {
            const errorMsg = "Some problem with data. token or password wrong!";
            setState({ isProcessing: false, isSuccess: false, hasError: true, msg: errorMsg });
        } else {

            // First: obtains admin access token
            const responseAdminToken: Promise<any> = authTokenService.getAdminTokenService();
            
            responseAdminToken.then(jwtAdminToken => {
                // Second: send email to confirmation process
                authClient.updatePassword(token, password, jwtAdminToken)
                .then(info => {
                    setState({ isProcessing: false, isSuccess: true, hasError: false, msg: 'Password updated!'  });

                })
                    .catch(err => {
                        // Error Can not update password
                        const msgErrorKey = err.message ;
                        setState({ isProcessing: false, isSuccess: false, hasError: true, msg: msgErrorKey });
                    });

            }).catch(err => {
                // Error Can not acquire Admin token from service
                const errorMsgKey = "register.error.cannot.acquire.token";
                setState({ isProcessing: false, isSuccess: false, hasError: true, msg: errorMsgKey  });
                //removeSessionValue();
            });
        }
    }, [authClient, authTokenService]);

    return {
        isProcessing: state.isProcessing,
        isSuccess: state.isSuccess,
        hasError: state.hasError,
        msg: state.msg,
        updatePassword,
        sendEmailToRecovery,
    };
};