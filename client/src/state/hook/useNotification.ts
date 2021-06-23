import { useCallback, useState } from 'react';
import { ContactType } from '../model/notification/ContactType';
import { NotificationServiceFactory } from '../../origin/client/notification/NotificationServiceFactory';
import { INotificationService } from '../../state/client/INotificationService';
//import getAppTokenService from '../../origin/client/user/GetAppTokenService';
import { AuthServiceFactory } from '../../origin/client/user/AuthServiceFactory';
import { IAuthService } from '../../state/client/IAuthService';
import * as GlobalConfig from '../../origin/config/GlobalConfig';

/**
 * useNotification custom hook
 * @returns 
 */
export default function useNotification() {

    const [state, setState] = useState({ sending: false, hasError: false, msg: '', wasSent: false });
    const notifService: INotificationService = NotificationServiceFactory.create(GlobalConfig.is_fake_mode);
    const authService: IAuthService = AuthServiceFactory.create(GlobalConfig.is_fake_mode);

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

        // First: obtains app access token
        const responseAdminToken: Promise<any> = authService.getAppTokenService();

        // Second: send email with authorization using app access token
        responseAdminToken.then(jwtAppToken => {
            notifService.sendContactEmailService(contact, jwtAppToken).then(info => {
                console.log("Response sent info...");
                console.log(info);
                setState({ sending: false, hasError: false, msg: "Sent email!", wasSent: true })
            })
                .catch(err => {
                    console.log("Have ERROR!!!");
                    setState({ sending: false, hasError: true, msg: err.message, wasSent: false });
                });

        }).catch(err => {
            // Error Can not acquire App token from service
            const errorText = err.message + " Error Can not acquire App token from service."
            setState({ sending: false, hasError: true, msg: errorText, wasSent: false });
        });

    }, [setState, notifService, authService]);


    return {
        sending: state.sending,
        hasError: state.hasError,
        msg: state.msg,
        wasSent: state.wasSent,
        sendContactEmail,
    };
};