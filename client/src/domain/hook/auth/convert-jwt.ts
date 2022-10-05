import { SessionType } from "domain/model/auth/session.type";
import { Tokens } from "domain/model/auth/tokens.type";
var jws = require('jws');

    /**
     * Decode JWT and return data from payload in SessionType value.
     * @param jwt Jason Web Token
     * @returns SessionType object
     */
     export const convertJwtToSessionType = (tokens: Tokens) => {
        const jwtDecoded = jws.decode(tokens.access_token);
        //console.log("refresh_toke:",tokens.refresh_token);
        const errorJwtDecodedFail = "Decoded JWT fail! JWT decoded is null.";
        if (!jwtDecoded) throw Error(errorJwtDecodedFail);
        //console.log("jwtDecoded:",jwtDecoded);
        const payload = jwtDecoded.payload;
        console.log("payload:", payload);

        //StateConfig.clientId
        //const roles = payload.resource_access.rest-client-test.roles //  ['uma_protection', 'admin', 'user']

        let theRoles = [];
        try {
            theRoles = payload.roles;
            console.log("ROLES:", theRoles);
        } catch (err) {
            console.log('Roles not found in JWT!');
        }
        //console.log("payload:",payload);
        // Authorizedaccess_token: (string | null),
        const userSessionData: SessionType = {
            createdTimestamp: '', //TODO
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_in: tokens.expires_in,
            refresh_expires_in: tokens.refresh_expires_in,
            date: tokens.date,
            isLogged: payload.email_verified, //If email ferified is logged
            email: payload.email,
            email_verified: payload.email_verified,
            given_name: payload.username,
            preferred_username: payload.username,
            userId: payload.sub,
            roles: theRoles,
            firstName: payload.firstName,
            lastName: payload.lastName
        };
        return userSessionData;
    };