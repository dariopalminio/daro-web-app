import { Address } from "./address.type";

export type Profile = {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    docType: string; 
    document: string;
    telephone: string;
    language: string;
    addresses: Address[];
  };