import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRepository } from '../../../domain/output-port/repository.interface';
import { IProduct } from '../../../domain/model/product/product.interface';
import { Product } from '../../../domain/model/product/product';
import { ProductDocument, PRODUCT_COLLECTION_TOKEN } from '../schema/product.schema';


export const CATEGORY_REPO_TOKEN = 'CategoryRepositoryImplementation'; //ModelToken
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

    async find(query: any): Promise<IProduct[]> {
        const arrayDoc: ProductDocument[] = await  this.productModel.find(query).exec();
        return this.castArrayDocToProduct(arrayDoc);
    }

    /**
     * getById
     * If it does not find it, it returns null
     */
    async getById(id: string): Promise<IProduct> {
        const prodDoc: ProductDocument = await this.productModel.findById(id).exec();
        const objCasted: IProduct = JSON.parse(JSON.stringify(prodDoc));
        return objCasted;
        //return this.conversorDocToCategory(catDoc);
    };

    async getByQuery(query: any): Promise<IProduct> {
        const prodDoc: ProductDocument =  await this.productModel.findOne(query);
        const objCasted: IProduct = JSON.parse(JSON.stringify(prodDoc));
        return objCasted;
    }

    async hasById(id: string): Promise<boolean> {
        const prodDoc: ProductDocument = await this.productModel.findById(id).exec();
        if (!prodDoc) return false;
        return true;
    }

    async hasByQuery(query: any): Promise<boolean> {
        const prodDoc: ProductDocument  =  await this.productModel.findOne(query);
        if (!prodDoc) return false;
        return true;
    }

    async create<IProduct>(prod: Product): Promise<boolean> {
        const docCreated: ProductDocument = await this.productModel.create(prod);
        return !!docCreated;
    };

    async updateById(id: string, prod: Product): Promise<boolean> {
        const docUpdated: ProductDocument = await this.productModel.findByIdAndUpdate(id, prod, {useFindAndModify: false}).exec();
        return !!docUpdated;
    };

    async update(query: any, valuesToSet: any): Promise<boolean> {
        const docUpdated: ProductDocument = await this.productModel.findOneAndUpdate(query, valuesToSet,).exec();
        return !!docUpdated;
    };

    async delete(id: string): Promise<boolean> {
        const docDeleted = await this.productModel.findByIdAndDelete(id, {useFindAndModify: false}).exec();
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
            Number(Doc.stock),
            []
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