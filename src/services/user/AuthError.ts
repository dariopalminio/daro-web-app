import { AxiosError } from 'axios';

// See https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP
export enum AuthStatusEnum {
    UNKNOWN = 0,
    UNAUTHORIZED = 401,
    CONFLICT = 409, //CONFLICT: Username already exists!
    BAD_REQUEST = 400,
    ERR_CONNECTION_REFUSED = 102, //Network Error
}

/**
 * Dictionary of customized messages for status errors
 */
export const AuthStatusText = {
    'UNKNOWN': { status: 0, text: 'UNKNOWN' },
    'UNAUTHORIZED': { status: 401, text: 'UNAUTHORIZED' },
    'CONFLICT': { status: 409, text: 'Conflict: username already exists!' },
    'BAD_REQUEST': { status: 400, text: 'Bad Request!' },
    'ERR_CONNECTION_REFUSED': { status: 102, text: 'Network Error!' },
};

export interface IAuthError<T = any> extends Error {
    status: number;
    statusText: string;
    customText: string;
}

/**
 * AuthError is Error customized
 */
export class AuthError<T = any> extends Error {
    status: number;
    statusText: string;
    customText: string;

    constructor(error: Error, status: number, statusText: string, customText: string) {
        super(error.message);
        this.stack = error.stack;
        this.name = 'AuthError';
        this.status = status;
        this.customText = customText;
        this.statusText = statusText;
    }
}

/**
 * handleAxiosError 
 * returns a Error customized from AxiosError or Error
 * 
 * @param e Error as any
 * @returns AuthError
 */
export function handleAxiosError(e: any): AuthError {

    if (e.isAxiosError) {
        const axiosError: AxiosError = e;
        if (e.response) {
            const status: number = axiosError.response?.status ? axiosError.response?.status : 0
            const txt: string = axiosError.response?.statusText ? axiosError.response?.statusText : "Unknown"

            switch (status) {
                case AuthStatusEnum.UNAUTHORIZED:
                    return new AuthError(e, status, txt, AuthStatusText.UNAUTHORIZED.text);

                case AuthStatusEnum.CONFLICT:
                    return new AuthError(e, status, txt, AuthStatusText.CONFLICT.text);

                case AuthStatusEnum.BAD_REQUEST:
                    return new AuthError(e, status, txt, AuthStatusText.BAD_REQUEST.text);

                default:
                    return new AuthError(e, status, txt, AuthStatusText.UNKNOWN.text);
            }
        }
    }

    if (e.message == "Network Error") {
        return new AuthError(e, AuthStatusEnum.ERR_CONNECTION_REFUSED, "Network Error", AuthStatusText.ERR_CONNECTION_REFUSED.text);
    }

    return new AuthError(e, AuthStatusEnum.UNKNOWN, e.message, AuthStatusText.UNKNOWN.text);
}
