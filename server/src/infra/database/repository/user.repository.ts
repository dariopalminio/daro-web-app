import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRepository } from '../../../domain/output/port/repository.interface';
import { IUser } from '../../../domain/model/user/user.interface';
import { User } from '../../../domain/model/user/user';
import { UserDocument, USER_COLLECTION_TOKEN } from '../schema/user.schema';


/**
 * Mongo repository implementation
 */
@Injectable()
export class UserRepository implements IRepository<IUser> {

    constructor(
        @InjectModel(USER_COLLECTION_TOKEN)
        private readonly categoryModel: Model<UserDocument>,
    ) { }

    async getAll(): Promise<IUser[]> {
        const arrayDoc: UserDocument[] = await this.categoryModel.find({}).exec();
        return this.castArrayDocToUser(arrayDoc);
        //return this.conversorArrayDocToCategory(arrayDoc);
    };

    async getById(id: string): Promise<IUser> {
        const catDoc: UserDocument = await this.categoryModel.findById(id).exec();
        //Doc has id name "_id"
        const objCasted: IUser = JSON.parse(JSON.stringify(catDoc));
        return objCasted;
        //return this.conversorDocToCategory(catDoc);
    };

    async create<IUser>(doc: IUser): Promise<boolean> {
        const docCreated: UserDocument = await this.categoryModel.create(doc);
        return !!docCreated;
    };

    async update(id: string, doc: any): Promise<boolean> {
        const docUpdated: UserDocument = await this.categoryModel.findByIdAndUpdate(id, doc, {useFindAndModify: false}).exec();
        return !!docUpdated;
    };

    async delete(id: string): Promise<boolean> {
        const docDeleted = await this.categoryModel.findByIdAndDelete(id, {useFindAndModify: false}).exec();
        return !!docDeleted; //doc is not null
    };


    castArrayDocToUser(categoryDocArray: UserDocument[]): IUser[] {
        let arrayCategory: User[] = [];

        categoryDocArray.forEach(element => arrayCategory.push(
            JSON.parse(JSON.stringify(element))
        ));

        return arrayCategory;
    };

}