
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRepository } from '../../../domain/output-port/repository.interface';
import { ICategory } from '../../../domain/model/category/category.interface';
import { Category } from '../../../domain/model/category/category';
import { CategoryDTO } from '../../../domain/model/category/category.dto';
import { CategoryDocument } from '../schema/category.schema';


/**
 * Mongo repository implementation
 */
@Injectable()
export class CategoryRepository implements IRepository<ICategory> {

    constructor(
        @InjectModel('Category')
        private readonly categoryModel: Model<CategoryDocument>,
    ) { }

    async getAll(): Promise<ICategory[]> {
        const arrayDoc: CategoryDocument[] = await this.categoryModel.find({}).exec();
        return this.castArrayDocToCategory(arrayDoc);
        //return this.conversorArrayDocToCategory(arrayDoc);
    };

    async find(query: any): Promise<ICategory[]> {
        const arrayDoc: CategoryDocument[] = await  this.categoryModel.find(query).exec();
        return this.castArrayDocToCategory(arrayDoc);
    }

    async getById(id: string): Promise<ICategory> {
        const catDoc: CategoryDocument = await this.categoryModel.findById(id).exec();
        //Doc has id name "_id"
        const objCasted: ICategory = JSON.parse(JSON.stringify(catDoc));
        return objCasted;
        //return this.conversorDocToCategory(catDoc);
    };

    async getByQuery(query: any): Promise<ICategory> {
        const catDoc: CategoryDocument =  await this.categoryModel.findOne(query);
        const objCasted: ICategory = JSON.parse(JSON.stringify(catDoc));
        return objCasted;
    }

    async hasById(id: string): Promise<boolean> {
        const catDoc: CategoryDocument = await this.categoryModel.findById(id).exec();
        if (!catDoc) return false;
        return true;
    }

    async hasByQuery(query: any): Promise<boolean> {
        const catDoc: CategoryDocument  =  await this.categoryModel.findOne(query);
        if (!catDoc) return false;
        return true;
    }

    async create<ICategory>(doc: ICategory): Promise<boolean> {
        const docCreated: CategoryDocument = await this.categoryModel.create(doc);
        return !!docCreated;
    };

    async updateById(id: string, doc: any): Promise<boolean> {
        const docUpdated: CategoryDocument = await this.categoryModel.findByIdAndUpdate(id, doc, {useFindAndModify: false}).exec();
        return !!docUpdated;
    };

    async update(query: any, valuesToSet: any): Promise<boolean> {
        const docUpdated: CategoryDocument = await this.categoryModel.findOneAndUpdate(query, valuesToSet,).exec();
        return !!docUpdated;
    };

    async delete(id: string): Promise<boolean> {
        const docDeleted = await this.categoryModel.findByIdAndDelete(id, {useFindAndModify: false}).exec();
        return !!docDeleted; //doc is not null
    };

    /**
    * Convert from Mongo CategoryDocument to Category class. 
    * This is a Casting function.
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
     * Convert from Mongo CategoryDocument array to Category class array.
     *  This is a Casting function.
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

    castArrayDocToCategory(categoryDocArray: CategoryDocument[]): ICategory[] {
        let arrayCategory: Category[] = [];

        categoryDocArray.forEach(element => arrayCategory.push(
            JSON.parse(JSON.stringify(element))
        ));

        return arrayCategory;
    };

}