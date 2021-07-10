import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../context/session.context';
import { ContactType } from '../model/notification/contact.type';
import { INotificationService } from '../service/notification.service.interface';
import * as StateConfig from '../domain.config';
import { IAuthService } from '../service/auth.service.interface';
import { SessionType } from '../model/user/session.type';

/**
 * useNotification custom hook
 * @returns 
 */
export default function useNotification(
    authServiceInjected: IAuthService | null = null,
    notifServiceInjected: INotificationService | null = null) {

    const { session } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ sending: false, hasError: false, msg: '', wasSent: false });
    const notifService: INotificationService = notifServiceInjected ? notifServiceInjected : StateConfig.notificationService;
    const authService: IAuthService = authServiceInjected ? authServiceInjected : StateConfig.authorizationService;

    /**
     * sendContactEmail
     */
    const sendContactEmail = useCallback((contact: ContactType) => {
        setState({ sending: true, hasError: false, msg: "Trying to logout!", wasSent: false });

        console.log("Sending email simulation from...");
        console.log(contact);

        if (!contact || contact == null) {
            console.log("Contact is empty!");
            setState({ sending: false, hasError: true, msg: "Contact is empty!", wasSent: false });
            return;
        };

        let promise: Promise<string> = getToken(session);

        promise.then(token => {
            // Second: send email with authorization using app access token    
            notifService.sendContactEmailService(contact, token).then(info => {
                console.log("Response sent info...");
                console.log(info);
                setState({ sending: false, hasError: false, msg: "Sent email!", wasSent: true })
            })
                .catch(err => {
                    if (err.status === 401) {
                        console.log("sendContactEmailService-->UNAUTHORIZED!!!");
                        let refresh_token: string = session?.refresh_token ? session?.refresh_token : '';
                        //(refreshToken: string): Promise<Tokens>
                        const rToken = authService.getRefreshTokenService(refresh_token);
                        rToken.then(token => {
                            console.log("rToken:", rToken);
                        });
                    }
                    console.log("Have ERROR!!!");
                    setState({ sending: false, hasError: true, msg: err.message, wasSent: false });
                });
        }).catch(err => {
            // Error Can not acquire App token from service
            const errorText = err.message + " Error Can not acquire App token from service."
            setState({ sending: false, hasError: true, msg: errorText, wasSent: false });
            return;
        });


    }, [setState, notifService, authService]);

    async function getToken(session: SessionType | undefined) {
        let token: string = '';
        if (session && session?.isLogged) {
            console.log("Session OK!!!");
            token = session.access_token ? session.access_token : '';

        } else {
            console.log("responseAdminToken!!!");
            // First: obtains app access token
            token = await authService.getAppTokenService();
        };
        return token;
    }

    return {
        sending: state.sending,
        hasError: state.hasError,
        msg: state.msg,
        wasSent: state.wasSent,
        sendContactEmail,
    };
};