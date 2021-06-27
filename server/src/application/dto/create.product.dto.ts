import { Product } from "src/domain/model/entity/product.interface";

export class CreateProductDTO{
    readonly name: string;
    readonly description: string;
    readonly imageURL: string;
    readonly price: number;
    readonly sku:  String;
    readonly barcode:  String;
    readonly stock: number;
};