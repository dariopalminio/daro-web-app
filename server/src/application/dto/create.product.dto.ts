import { Product } from "src/domain/model/entity/product.interface";

export class CreateProductDTO{
    readonly name: string;
    readonly description: string;
    readonly imageURL: string;
    readonly price: number;
    //readonly countInStock: number;
};