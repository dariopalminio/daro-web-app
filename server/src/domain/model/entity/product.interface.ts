
import { Document } from 'mongoose'; //Mongo

export interface IProduct extends Document{
    //_id: holds an ObjectId.
    readonly name: string;
    readonly description: string;
    readonly imageURL: string;
    readonly price: number;
    readonly sku:  String;
    readonly barcode:  String;
    readonly stock: number;
};

