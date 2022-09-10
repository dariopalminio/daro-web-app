import { useState } from 'react';
import { ContactType } from '../model/notification/contact.type';
import { INotificationClient } from '../service/notification-client.interface';
import * as StateConfig from '../domain.config';
import { IAuthTokensClient } from '../service/auth-tokens-client.interface';


/**
 * use Notification 
 * Custom hook
 * 
 * @returns 
 */
export default function useNotification(
    authTokensClientInjected: IAuthTokensClient | null = null,
    authClientInjected: IAuthTokensClient | null = null,
    notifClientInjected: INotificationClient | null = null) {

    const [state, setState] = useState({ sending: false, hasError: false, msg: '', wasSent: false });
    const notifClient: INotificationClient = notifClientInjected ? notifClientInjected : StateConfig.notificationClient;
    const authTokenService: IAuthTokensClient = authTokensClientInjected ? authTokensClientInjected : StateConfig.authTokensClient;

    /**
     * sendContactEmail
     */
    const sendContactEmail = (contact: ContactType) => {
        setState({ sending: true, hasError: false, msg: "notification.info.sending", wasSent: false });

        console.log("Sending email simulation from...");
        console.log(contact);

        if (!contact || contact == null) {
            console.log("Contact is empty!");
            setState({ sending: false, hasError: true, msg: "notification.error.contact.empty", wasSent: false });
            return;
        };

        const responseAdminToken: Promise<any> = authTokenService.getAdminTokenService();

        responseAdminToken.then(token => {
            // Second: send email with authorization using app access token    
            notifClient.sendContactEmailService(contact, token).then(info => {
                console.log("Response sent info...");
                console.log(info);
                setState({ sending: false, hasError: false, msg: "contact.success.sent.email", wasSent: true })
            })
                .catch(err => {
                    if (err.status === 401) {
                        //getRefreshToken();
                    }
                    const errorKey = "notification.error.cannot.send.email";
                    console.log("Can not send email!!!", err.message);
                    setState({ sending: false, hasError: true, msg: errorKey, wasSent: false });
                });
        }).catch(err => {
            // Error Can not acquire App token from service
            const errorKey = "notification.error.cannot.send.email.by.token.fail";
            setState({ sending: false, hasError: true, msg: errorKey, wasSent: false });
            return;
        });

    };

    return {
        sending: state.sending,
        hasError: state.hasError,
        msg: state.msg,
        wasSent: state.wasSent,
        sendContactEmail,
    };
};