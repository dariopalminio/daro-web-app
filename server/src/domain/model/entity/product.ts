import { IProduct } from '../../../domain/model/entity/product.interface';
import { ICategory } from '../../../domain/model/entity/category.interface';

export class Product implements IProduct {

    constructor(id: string, name: string, description: string,
        imageURL: string, price: number, barcode: string, stock: number, categories: ICategory[]) {
        this._id = id;
        this.name = name;
        this.description = description;
        this.imageURL = imageURL;
        this.price = price;
        this.barcode = barcode;
        this.stock = stock;
        this.categories = categories;
    };

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


