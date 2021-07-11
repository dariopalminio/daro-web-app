import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../context/session.context';
import { ContactType } from '../model/notification/contact.type';
import { INotificationService } from '../service/notification.service.interface';
import * as StateConfig from '../domain.config';
import { IAuthService, Tokens } from '../service/auth.service.interface';
import { SessionType } from '../model/user/session.type';

/**
 * useNotification custom hook
 * @returns 
 */
export default function useNotification(
    authServiceInjected: IAuthService | null = null,
    notifServiceInjected: INotificationService | null = null) {

    const { session, isTokenExpired, setSessionValue } = useContext(SessionContext) as ISessionContext;
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


    }, [setState, notifService, authService, getToken, session]);

    /**
     * Gets the acces token of the logged session (if user is already logged) or 
     * requests an application token from the authentication server.
     * @param session 
     * @returns 
     */
    async function getToken(session: SessionType | undefined) {
        let token: string = '';
        if (session && session?.isLogged) {
            console.log("Acces token OK (if user is already logged)!!!");
            // Obtains access token from session local data
            token = session.access_token ? session.access_token : '';

            const expired: boolean = isTokenExpired(session.expires_in, session.date, new Date());
            
            if (expired) {
                console.log("EXPIRED!!!");
                //getRefreshTokenService: (refreshToken: string) => Promise<Tokens>;
             const refreshToken: string = session.refresh_token ? session.refresh_token : '';
                const result: Tokens = await authService.getRefreshTokenService(refreshToken);
                token = result.access_token;
                let newSession = {...session};
                newSession.access_token = token;
                setSessionValue(newSession);
            }

        } else {
            console.log("Requests an application token from the authentication server!");
            // Obtains app access token from authentication server
            token = await authService.getAppTokenService();
        };
        return token;
    };


      
    return {
        sending: state.sending,
        hasError: state.hasError,
        msg: state.msg,
        wasSent: state.wasSent,
        sendContactEmail,
    };
};