import { useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import * as StateConfig from '../../domain.config';
import { IAuthTokensClient } from '../../service/auth-tokens-client.interface';
import { Tokens } from '../../model/user/tokens.type';

/**
 * use Profile
 * Custom hook
 * 
 * @returns 
 */
export default function useToken(authClientInjected: IAuthTokensClient | null = null) {
    const { session, isTokenExpired, setSessionValue } = useContext(SessionContext) as ISessionContext;
    const authTokensClient: IAuthTokensClient = authClientInjected ? authClientInjected : StateConfig.authorizationClient;

    /**
     * Gets the acces token of the logged session (if user is already logged) or 
     * requests an application token from the authentication server.
     * @param session 
     * @returns 
     */     
     async function getToken() {
        let token: string = '';
        if (session && session?.isLogged) {
            console.log("Acces token OK (if user is already logged)!!!");
            // Obtains access token from session local data
            token = session.access_token ? session.access_token : '';

            console.log('session.expires_in:',session.expires_in);
            console.log('session.date:',session.date);
            console.log('new Date():',new Date());
            const expired: boolean = isTokenExpired(session.expires_in, session.date, new Date());
            
            if (expired) {
                console.log("EXPIRED!!!");
                //getRefreshTokenService: (refreshToken: string) => Promise<Tokens>;
             const refreshToken: string = session.refresh_token ? session.refresh_token : '';
                const result: Tokens = await authTokensClient.getRefreshTokenService(refreshToken);
                token = result.access_token;
                let newSession = {...session};
                newSession.access_token = token;
                setSessionValue(newSession);
            }

        } else {
            console.log("Requests an application token from the authentication server!");
            // Obtains app access token from authentication server
            token = await authTokensClient.getAppTokenService();
        };
        return token;
    };

    async function getRefreshToken() {
        console.log("sendContactEmailService-->UNAUTHORIZED!!!");
        let refresh_token: string = session?.refresh_token ? session?.refresh_token : '';
        //(refreshToken: string): Promise<Tokens>
        const rToken = authTokensClient.getRefreshTokenService(refresh_token);
        rToken.then(token => {
            console.log("rToken:", rToken);
        });
    };

    return {
        getToken,
        getRefreshToken
    };
};