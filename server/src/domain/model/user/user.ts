import { IUser } from './user.interface';

export class User implements IUser {

    constructor(
        enable: boolean,
        authId: string,
        username: string,
        firstName: string,
        lastname: string,
        email: string,
        verified: boolean,
        verificationCode: string,
        startVerificationCode: Date) {
        this.enable = enable;
        this.authId = authId;
        this.username = username;
        this.firstName = firstName;
        this.lastname = lastname;
        this.email = email;
        this.verified = verified;
        this.verificationCode = verificationCode;
        this.startVerificationCode = startVerificationCode;

    }

    _id: string; 
    enable: boolean;
    authId: string;
    username: string;
    firstName: string;
    lastname: string;
    email: string;
    verified: boolean;
    verificationCode: string;
    startVerificationCode: Date;
};