import { ICategory } from '../entity/category.interface';

export class CategoryDTO implements ICategory{
    //_id: holds an ObjectId.
    readonly name: string;
    readonly description: string;
};