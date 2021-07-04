import { ICategory } from '../../../domain/model/entity/category.interface';

export interface IProduct{
    _id: string; //_id: holds an ObjectId.
    name: string;
    description: string;
    imageURL: string;
    price: number;
    sku:  string;
    barcode:  string;
    stock: number;
    categories: ICategory[];
};

