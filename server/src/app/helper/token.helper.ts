
import { Request } from 'express';

export default function extractTokenFromHeader(req: Request): string {

    console.log('extractTokenFromHeader process...');
    console.log('extractTokenFromHeader Request:',req);

    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        const e = new Error("Can't extract token string from Bearer token!");
        throw e;
    }

console.log('extractTokenFromHeader process...');
    const token =  req.headers.authorization.substring(7, req.headers.authorization.length);
    console.log('extractTokenFromHeader token:',token);
    return token;
};
