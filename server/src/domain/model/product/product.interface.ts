import { ICategory } from '../category/category.interface';

export interface IProduct{
    _id: string; //_id: holds an ObjectId. { type: String, required: true, unique: true },
    name: string;
    description: string; //{ type: String, required: true, },
    imageURL: string;
    price: number; //{ type: Number, required: true },
    sku:  string;
    barcode:  string;
    stock: number;
    categories: ICategory[]; //categories: { type: Array },
};

