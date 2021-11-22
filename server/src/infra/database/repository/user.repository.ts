import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRepository } from '../../../domain/output-port/repository.interface';
import { IUser } from '../../../domain/model/user/user.interface';
import { User } from '../../../domain/model/user/user';
import { UserDocument } from '../schema/user.schema';


/**
 * Mongo repository implementation
 */
@Injectable()
export class UserRepository implements IRepository<IUser> {

    constructor(
        @InjectModel('User')
        private readonly userModel: Model<UserDocument>,
    ) { }

    async getAll(page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<IUser[]> {
        let arrayDoc: UserDocument[];

        if (page && limit && orderByField) {
            // All with pagination and sorting
            const direction: number = isAscending ? 1 : -1;
            const mysort = [[orderByField, direction]];
            const gap: number = (page - 1) * limit;
            arrayDoc = await this.userModel.find({}).sort(mysort).skip(gap).limit(limit).exec();
            //similar to arrayDoc.slice((page - 1) * limit, page * limit);
        } else {
            // All without pagination and without sorting
            arrayDoc = await this.userModel.find({}).exec();
        }

        return this.castArrayDocToUser(arrayDoc);
        //return this.conversorArrayDocToCategory(arrayDoc);
    };

    async find(query: any, page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<IUser[]> {
        let arrayDoc: UserDocument[];

        if (page && limit && orderByField) {
            // All with pagination and sorting
            const direction: number = isAscending ? 1 : -1;
            const mysort = [[orderByField, direction]];
            const gap: number = (page - 1) * limit;
            arrayDoc = await this.userModel.find(query).sort(mysort).skip(gap).limit(limit).exec();
        } else {
            // All without pagination and without sorting
            arrayDoc = await this.userModel.find(query).exec();
        }

        return this.castArrayDocToUser(arrayDoc);
    }

    async getById(id: string): Promise<IUser> {
        const userDoc: UserDocument = await this.userModel.findById(id).exec();
        //Doc has id name "_id"
        const objCasted: IUser = JSON.parse(JSON.stringify(userDoc));
        return objCasted;
        //return this.conversorDocToCategory(catDoc);
    };

    async getByQuery(query: any): Promise<IUser> {
        const userDoc: UserDocument =  await this.userModel.findOne(query);
        const objCasted: IUser = JSON.parse(JSON.stringify(userDoc));
        return objCasted;
    }

    async hasById(id: string): Promise<boolean> {
        const userDoc: UserDocument = await this.userModel.findById(id).exec();
        if (!userDoc) return false;
        return true;
    }

    async hasByQuery(query: any): Promise<boolean> {
        const userDoc: UserDocument =  await this.userModel.findOne(query);
        if (!userDoc) return false;
        return true;
    }

    async create<IUser>(doc: IUser): Promise<boolean> {
        const docCreated: UserDocument = await this.userModel.create(doc);
        return !!docCreated;
    };

    async updateById(id: string, doc: any): Promise<boolean> {
        const docUpdated: UserDocument = await this.userModel.findByIdAndUpdate(id, doc, {useFindAndModify: false}).exec();
        return !!docUpdated;
    };

    /**
     * 
     * Example:
     * { user_id: userId, username: username },
        { security_stamp: nonce, security_stamp_updated: new Date() }
     * @param one 
     * @param query 
     * @returns 
     */
    async update(query: any, valuesToSet: any): Promise<boolean> {
        const docUpdated: UserDocument = await this.userModel.findOneAndUpdate(query, valuesToSet,).exec();
        return !!docUpdated;
    };


    async delete(id: string): Promise<boolean> {
        const docDeleted = await this.userModel.findByIdAndDelete(id, {useFindAndModify: false}).exec();
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