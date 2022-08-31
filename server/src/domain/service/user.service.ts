import { Injectable, Inject } from '@nestjs/common';
import { IUserService } from '../service/interface/user.service.interface';
import { IUser } from '../model/user/user.interface';
import { User } from '../model/user/user';
import { IRepository } from '../output-port/repository.interface';
import { DomainError } from '../../domain/error/domain-error';

@Injectable()
export class UserService implements IUserService<IUser> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IRepository<IUser>) {
  }

  // Get all
  async getAll(page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<IUser[]> {
    const users: IUser[] = await this.userRepository.getAll(page, limit, orderByField, isAscending);
    return users;
  };

  async find(query: any, page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<IUser[]> {
    const users: IUser[] = await this.userRepository.find(query, page, limit, orderByField, isAscending);
    return users;
  };

  // Get a single
  async getById(id: string): Promise<IUser> {
    const user: IUser = await this.userRepository.getById(id);
    return user;
  };

  // Get a single user by auth id
  async getByAuthId(authId: string): Promise<IUser> {
    const user: IUser = await this.userRepository.getById(authId);
    return user;
  };

  //Create new user with basic data
  async create(userRegisterDTO: IUser): Promise<boolean> {
    try {
      let newUser: IUser = new User();
      newUser.authId = userRegisterDTO.authId;
      newUser.userName = userRegisterDTO.userName;
      newUser.email = userRegisterDTO.email;
      newUser.firstName = userRegisterDTO.firstName;
      newUser.lastName = userRegisterDTO.lastName;


      newUser.docType = userRegisterDTO.docType,
      newUser.document = userRegisterDTO.document,
      newUser.telephone = userRegisterDTO.telephone,
      //birth: Date;
      //newUser.gender = userRegisterDTO.gender,
      newUser.language = userRegisterDTO.language,

      newUser.verified = false;
      newUser.enable = true;
      newUser.verificationCode = "";

      const newCat: boolean = await this.userRepository.create(newUser);
      console.log(newCat);
      return newCat;
    } catch (error) { //MongoError 
      console.log("create error code:", error.code);
      switch (error.code) {
        case 11000:
          //  duplicate key error collection
          throw new DomainError(409, error.message, error);
        default:
          //Internal server error
          throw new DomainError(500, error.message, error);
      }
    }
  };

  // Delete user return this.labelModel.deleteOne({ osCode }).exec();
  async delete(id: string): Promise<boolean> {
    const deleted: boolean = await this.userRepository.delete(id);
    return deleted;
  };

  // Put a single user
  async updateById(id: string, user: IUser): Promise<boolean> {
    const updatedUser: boolean = await this.userRepository.updateById(id, user);
    return updatedUser;
  };

  async getByUserName(userName: string): Promise<IUser> {
    const query = {userName: userName};
    const user = await this.userRepository.getByQuery(query);
    return user;
  };

  async getByQuery(query: any): Promise<IUser> {
    const user = await this.userRepository.getByQuery(query);
    return user;
  };

  async update(query: any, valuesToSet: any): Promise<boolean> {
    const updatedProduct: boolean = await this.userRepository.update(query, valuesToSet);
    return updatedProduct;
  };

  async hasById(id: string): Promise<boolean> {
    return await this.userRepository.hasById(id);
  };

  async hasByQuery(query: any): Promise<boolean> {
    return await this.userRepository.hasByQuery(query);
  };

};
