
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRepository } from '../../../domain/output/port/repository.interface';
import { ICategory } from '../../../domain/model/entity/category.interface';
import { Category } from '../../../domain/model/entity/category';
import { CategoryDTO } from '../../../domain/model/value_object/category.dto';
import { CategoryDocument } from '../../../infrastructure/database/schema/category.schema';


export const CATEGORY_COLLECTION_TOKEN = 'categories'; //ModelToken

/**
 * Mongo repository implementation
 */
@Injectable()
export class CategoryRepository implements IRepository<ICategory> {

    constructor(
        @InjectModel(CATEGORY_COLLECTION_TOKEN)
        private readonly categoryModel: Model<CategoryDocument>,
    ) { }

    async getAll(): Promise<ICategory[]> {
        const arrayDoc: CategoryDocument[] = await this.categoryModel.find({}).exec();
        return this.conversorArrayDocToCategory(arrayDoc);
    };

    async getById(id: string): Promise<ICategory> {
        const catDoc: CategoryDocument = await this.categoryModel.findById(id).exec();
        return this.conversorDocToCategory(catDoc);
    };

    async create<CategoryDTO>(doc: CategoryDTO): Promise<boolean> {
        const docCreated: CategoryDocument = await this.categoryModel.create(doc);
        return !!docCreated;
    };

    async update(id: string, doc: any): Promise<boolean> {
        const docUpdated: CategoryDocument = await this.categoryModel.findByIdAndUpdate(id, doc).exec();
        return !!docUpdated;
    };

    async delete(id: string): Promise<boolean> {
        const docDeleted = await this.categoryModel.findByIdAndDelete(id).exec();
        return !!docDeleted; //doc is not null
    };

    /**
    * Convert from Mongo CategoryDocument to Category class
    * @param categoryDoc 
    * @returns 
    */
    conversorDocToCategory(categoryDoc: CategoryDocument): ICategory {
        return new Category(
            String(categoryDoc._id),
            String(categoryDoc.name),
            String(categoryDoc.description));
    };

    /**
     * Convert from Mongo CategoryDocument array to Category class array
     * @param categoryDocArray 
     * @returns 
     */
    conversorArrayDocToCategory(categoryDocArray: CategoryDocument[]): ICategory[] {
        let arrayCategory: Category[] = [];

        categoryDocArray.forEach(element => arrayCategory.push(
            new Category(String(element._id), String(element.name), String(element.description))
        ));

        return arrayCategory;
    };

}