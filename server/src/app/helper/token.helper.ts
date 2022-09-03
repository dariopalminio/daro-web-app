
import { Request } from 'express';

export default function extractTokenFromHeader(req: Request): string {
    if (req.headers.authorization.startsWith("Bearer ")) {
        return req.headers.authorization.substring(7, req.headers.authorization.length);
    } else {
        const e = new Error("Can't extract token string from Bearer token!");
        throw e;
    }
};
