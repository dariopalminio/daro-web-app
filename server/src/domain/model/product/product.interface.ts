import { ICategory } from '../category/category.interface';

export interface IProduct{
    _id: string; //_id: holds an ObjectId. { type: String, required: true, unique: true },
    sku:  string;
    barcode:  string;
    name: string;
    description: string; //{ type: String, required: true, },
    images: string[];
    category: string;
    type: string;
    brand: string;
    color: string;
    model: string;
    gender: string;
    size: string;
    netCost: number; 
    ivaAmountOnCost: number;
    grossCost: number; 
    netPrice: number; 
    ivaAmountOnPrice: number;
    grossPrice: number; 
    stock: number;
    active:boolean;  //is active to sell?
};

