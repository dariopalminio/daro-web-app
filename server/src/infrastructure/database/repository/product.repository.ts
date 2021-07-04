import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRepository } from '../../../domain/output/port/repository.interface';
import { IProduct } from '../../../domain/model/entity/product.interface';
import { Product } from '../../../domain/model/entity/product';
import { ProductDocument } from '../../../infrastructure/database/schema/product.schema';
import { Console } from 'console';


export const PRODUCT_COLLECTION_TOKEN = 'products'; //ModelToken

/**
 * Mongo repository implementation
 */
@Injectable()
export class ProductRepository implements IRepository<IProduct> {

    constructor(
        @InjectModel(PRODUCT_COLLECTION_TOKEN)
        private readonly productModel: Model<ProductDocument>,
    ) { }

    async getAll(): Promise<IProduct[]> {
        const arrayDoc: ProductDocument[] = await this.productModel.find({}).exec();
        return this.castArrayDocToProduct(arrayDoc);
        //return this.conversorArrayDocToCategory(arrayDoc);
    };

    /**
     * getById
     * If it does not find it, it returns null
     */
    async getById(id: string): Promise<IProduct> {
        const catDoc: ProductDocument = await this.productModel.findById(id).exec();
        //Doc has id name "_id"
        const objCasted: IProduct = JSON.parse(JSON.stringify(catDoc));
        return objCasted;
        //return this.conversorDocToCategory(catDoc);
    };

    async create<IProduct>(doc: IProduct): Promise<boolean> {
        const docCreated: ProductDocument = await this.productModel.create(doc);
        return !!docCreated;
    };

    async update(id: string, doc: any): Promise<boolean> {
        const docUpdated: ProductDocument = await this.productModel.findByIdAndUpdate(id, doc).exec();
        return !!docUpdated;
    };

    async delete(id: string): Promise<boolean> {
        const docDeleted = await this.productModel.findByIdAndDelete(id).exec();
        return !!docDeleted; //doc is not null
    };

    /**
    * Convert from Mongo CategoryDocument to Category class. 
    * This is a Casting function.
    * @param categoryDoc 
    * @returns 
    */
    conversorDocToCategory(Doc: ProductDocument): IProduct {
        return new Product(
            String(Doc._id),
            String(Doc.name),
            String(Doc.description),
            String(Doc.imageURL),
            Number(Doc.price),
            String(Doc.barcode),
            Number(Doc.stock)
            );
    };

    /**
     * Convert from Mongo CategoryDocument array to Category class array.
     *  This is a Casting function.
     * @param categoryDocArray 
     * @returns 
     */
    conversorArrayDocToCategory(docArray: ProductDocument[]): IProduct[] {
        let productArray: IProduct[] = [];

        docArray.forEach(element => productArray.push(
            this.conversorDocToCategory(element)
        ));

        return productArray;
    };

    castArrayDocToProduct(categoryDocArray: ProductDocument[]): IProduct[] {
        let arrayCategory: IProduct[] = [];

        categoryDocArray.forEach(element => arrayCategory.push(
            JSON.parse(JSON.stringify(element))
        ));

        return arrayCategory;
    };

};