import axios, {AxiosError} from 'axios';

// See https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP
export enum AuthStatusEnum {
    UNKNOWN = 0,
    UNAUTHORIZED = 401,
    CONFLICT = 409, //CONFLICT: Username already exists!
    BAD_REQUEST = 400,
    ERR_CONNECTION_REFUSED = 102, //Network Error
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    REQUEST_TIMEOUT = 408,
    UNSUPPORTED_MEDIA_TYPE = 415,
    NO_CONTENT = 204,
}

/**
 * Dictionary of customized messages for status errors
 */
export const AuthStatusText = {
    'UNKNOWN': { status: 0, text: 'auth.error.unknow' },
    'UNAUTHORIZED': { status: 401, text: 'login.auth.error.unauthorized' },
    'CONFLICT': { status: 409, text: 'auth.error.conflict' },
    'BAD_REQUEST': { status: 400, text: 'auth.error.bad.request' },
    'ERR_CONNECTION_REFUSED': { status: 102, text: 'auth.error.connection.refused' },
    'FORBIDDEN': { status: 403, text: 'auth.error.forbidden' },
    'NOT_FOUND': { status: 404, text: 'auth.error.not.found' },
    'REQUEST_TIMEOUT': { status: 408, text: 'auth.error.request.timeout' },
    'UNSUPPORTED_MEDIA_TYPE': { status: 415, text: 'auth.error.unsupported.media.type' },
    'NO_CONTENT': { status: 204, text: 'auth.error.no.content' },
};

export interface IAuthError extends Error {
    status: number;
    statusText: string;
    customText: string;
}

/**
 * AuthError is Error customized
 */
export class ApiError extends Error {
    status: number;
    statusText: string;

    constructor(message: string, stack: string | undefined, status: number, statusText: string) {
        super(message);
        this.stack = stack;
        this.name = 'AuthError';
        this.status = status;
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
export function handleAxiosError(e: Error | AxiosError): ApiError {
  
    if (axios.isAxiosError(e)) {
        
        const axiosError: AxiosError = e;
        if (e.response) {
            const status: number = axiosError.response?.status ? axiosError.response?.status : 0
            const txt: string = axiosError.response?.statusText ? axiosError.response?.statusText : "Unknown"
           
            switch (status) {
                case AuthStatusEnum.UNAUTHORIZED:
                    return new ApiError(AuthStatusText.UNAUTHORIZED.text, e.stack, status, txt);

                case AuthStatusEnum.CONFLICT:
                    return new ApiError(AuthStatusText.CONFLICT.text, e.stack, status, txt);

                case AuthStatusEnum.BAD_REQUEST:
                    return new ApiError(AuthStatusText.BAD_REQUEST.text, e.stack, status, txt);

                case AuthStatusEnum.FORBIDDEN:
                    return new ApiError(AuthStatusText.FORBIDDEN.text, e.stack, status, txt);

                default:
                    return new ApiError(AuthStatusText.UNKNOWN.text, e.stack, status, txt);
            }
        }
    }
    
    if (e instanceof ApiError) return e;

    if (e.message === "Network Error") {
        return new ApiError(AuthStatusText.ERR_CONNECTION_REFUSED.text, e.stack, AuthStatusEnum.ERR_CONNECTION_REFUSED, "Network Error");
    }

    return new ApiError(AuthStatusText.UNKNOWN.text, e.stack, AuthStatusEnum.UNKNOWN, e.message);
}
