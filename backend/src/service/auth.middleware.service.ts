import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as GlobalConfig from '../config/GlobalConfig';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddlewareService implements NestMiddleware {

    /**
     * In initialization phase microservice loads public key and signing algorithm
     * from Keycloak’s well known config page. On each request microservice checks 
     * the signature of the bearer token. Token validation is done offline without 
     * going to Keycloak.
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    use(req: Request, res: Response, next: () => void) {

        try {
            const userVerified = this.verifyRequest(req);
        } catch (error) {
            return res.status(403).send({ message: error.message })
        };

        next();
    };

    /**
     * Verify if Jason Web Token is OK.
     * @param req 
     * @returns 
     */
    private verifyRequest(req: Request): any {
        if (!req.headers || !req.headers.authorization) {
            throw Error("Unauthorized! No authorization data in Header.");
        } else {

            var token = "";

            if (req.headers.authorization.startsWith("Bearer ")) {
                token = req.headers.authorization.substring(7, req.headers.authorization.length);
            } else {
                throw Error("Can't extract token string from Bearer token!");
            }

            return jwt.verify(token, this.getPEMPublicKey(), { algorithms: ['RS256'] });
        }
    };

    /**
     * Create the PEM string base64 decode with auth public key
     * @returns 
     */
    private getPEMPublicKey(): string {
        if (!GlobalConfig.PUBLIC_KEY || GlobalConfig.PUBLIC_KEY === '')
            throw Error("The public key is wrong!");
        let pem = '';
        pem += '-----BEGIN PUBLIC KEY-----\n';
        pem += GlobalConfig.PUBLIC_KEY;
        pem += '\n';
        pem += '-----END PUBLIC KEY-----\n';
        return pem;
    };


};