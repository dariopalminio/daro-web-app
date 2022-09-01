import { useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../context/session.context';
import { ContactType } from '../model/notification/contact.type';
import { INotificationClient } from '../service/notification-client.interface';
import * as StateConfig from '../domain.config';
import { IAuthTokensClient } from '../service/auth-tokens-client.interface';
import { SessionType } from '../model/user/session.type';
import { Tokens } from '../model/user/tokens.type';
import { IProfileClient } from '../service/profile-client.interface';
import useToken from './user/token.hook';

/**
 * use Profile
 * Custom hook
 * 
 * @returns 
 */
export default function useProfile(authClientInjected: IAuthTokensClient | null = null,
    profileClientInjected: IProfileClient | null = null) {

    const { session, isTokenExpired, setSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ isProcessing: false, hasError: false, msg: '', isSuccess: false });
    const profClient: IProfileClient = profileClientInjected ? profileClientInjected : StateConfig.profileClient;
    const { getToken, getRefreshToken } = useToken(authClientInjected);

    const getProfile = async (userName: string | undefined) => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });



        console.log("getProfile...");
        console.log(userName);

        if (!userName || userName == null) {
            console.log("userName is empty!");
            setState({ isProcessing: false, hasError: true, msg: "profile.error.userName.empty", isSuccess: false });
            return;
        };

        try {
            const token: string = await getToken();
            try {

                let info = await profClient.getProfileService(userName, token);


                console.log("Response sent info...");
                console.log(info);
                setState({ isProcessing: false, hasError: false, msg: "profile.get.user.success", isSuccess: true });
                return info;

            } catch (error) {
                console.error(error);
                //if (error.status === 401) {
                //   getRefreshToken();
                //}
                const errorKey = "profile.error.cannot.get.user";
                console.log("Can not send email!!!", error);
                setState({ isProcessing: false, hasError: true, msg: errorKey, isSuccess: false });
                throw error;
            }
        } catch (err) {
            // Error Can not acquire App token from service
            const errorKey = "profile.error.cannot.get.user.by.token.fail";
            setState({ isProcessing: false, hasError: true, msg: errorKey, isSuccess: false });
            throw err;
        };


    };



    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        getProfile,
    };
};