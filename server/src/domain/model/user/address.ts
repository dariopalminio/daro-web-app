import { IAddress } from "./address.interface";

export class Address implements IAddress {
        street: boolean;
        department: string;
        city: string;
        state: string;
        country: string;
    };