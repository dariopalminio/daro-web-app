import { ICategory } from '../category/category.interface';

export interface IProduct{
    _id: string; //_id: holds an ObjectId. { type: String, required: true, unique: true },
    sku:  string;
    barcode:  string;
    name: string;
    description: string; //{ type: String, required: true, },
    imageURL: string;
    category: string;
    type: string;
    brand: string;
    color: string;
    model: string;
    gender: string;
    size: string;
    cost: number; //{ type: Number, required: true },
    price: number; //{ type: Number, required: true },
    stock: number;
};

