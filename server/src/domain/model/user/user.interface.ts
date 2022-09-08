import { IAddress } from "./address.interface";

export interface IUser{
    _id: string; //_id: holds an ObjectId.
    enable: boolean;
    authId: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;

    docType: string;  //docType (RUT|DNI)
    document: string;
    telephone: string;
    //birth: Date;
    //gender: string;
    language: string;

    addresses: IAddress[];
    verified: boolean;
    verificationCode: string;
    startVerificationCode: Date;
};
