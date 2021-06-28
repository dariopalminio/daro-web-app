import { ICategory } from '../../../domain/model/entity/category.interface';

export class Category implements ICategory {

    constructor(id: string, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    id: string; //_id: holds an ObjectId.
    name: string;
    description: string;
};