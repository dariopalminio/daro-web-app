import { IAddress } from "./address.interface";

export type UserDTO = {
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
  };