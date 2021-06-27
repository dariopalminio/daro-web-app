import { Document } from 'mongoose';

export interface IProduct extends Document{
    readonly name: string;
    readonly description: string;
    readonly imageURL: string;
    readonly price: number;
    readonly sku:  String;
    readonly barcode:  String;
    readonly stock: number;
};

