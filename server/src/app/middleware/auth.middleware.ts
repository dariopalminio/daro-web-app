import { Injectable, NestMiddleware, Inject} from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { IGlobalConfig } from '../../domain/output-port/global-config.interface';

/**
 * Middleware is called only before the route handler is called. You have access to the response object, 
 * but you don't have the result of the route handler. They are basically express middleware functions.
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        @Inject('IGlobalConfig')
        private readonly globalConfig: IGlobalConfig,
      ) { };

    /**
     * In initialization phase microservice loads public key and signing algorithm
     * from Auth server (Keycloak’s) well known config page. On each request microservice checks 
     * the signature of the bearer token. Token validation is done offline without 
     * going to Auth server (Keycloak).
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    use(req: Request, res: Response, next: () => void) {
        console.log("AUTH_MIDDLEWARE_ON=", this.globalConfig.get<string>('AUTH_MIDDLEWARE_ON'));

        if (this.globalConfig.get<string>('AUTH_MIDDLEWARE_ON')) {
            try {
                const userVerified = this.verifyRequest(req);
            } catch (error) {
                // Unauthorized
                return res.status(401).send({ message: error.message });
            };
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
            const e = new Error("Unauthorized! No authorization data in Header.");
            throw e;
        } else {

            var token = "";

            if (req.headers.authorization.startsWith("Bearer ")) {
                token = req.headers.authorization.substring(7, req.headers.authorization.length);
            } else {
                const e = new Error("Can't extract token string from Bearer token!");
                throw e;
            }

            return jwt.verify(token, this.getPEMPublicKey(), { algorithms: ['RS256'] });
        }
    };

    /**
     * Create the PEM string base64 decode with auth public key
     * @returns 
     */
    private getPEMPublicKey(): string {
        if (!this.globalConfig.get<string>('PUBLIC_KEY') || this.globalConfig.get<string>('PUBLIC_KEY') === '')
            throw Error("The public key is wrong!");
        let pem = '';
        pem += '-----BEGIN PUBLIC KEY-----\n';
        pem += this.globalConfig.get<string>('PUBLIC_KEY');
        pem += '\n';
        pem += '-----END PUBLIC KEY-----\n';
        return pem;
    };


};