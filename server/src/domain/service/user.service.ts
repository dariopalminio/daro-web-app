import { Injectable, Inject } from '@nestjs/common';

import { IUserService } from '../input/port/user.service.interface';
import { IUser } from '../model/user/user.interface';
import { User } from '../model/user/user';
import { IRepository } from '../../domain/output/port/repository.interface';

import { UserRegisterDTO } from '../model/auth/register/user_register.dto.type';

export const USER_REPOSITORY_TOKEN = 'UserRepository_Implementation'; //ModelToken

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IRepository<IUser>) {
  }

  // Get all
  async getAll(): Promise<IUser[]> {
    const users: IUser[] = await this.userRepository.getAll();
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
  async create(userRegisterDTO: UserRegisterDTO): Promise<boolean> {

    console.log("UserRegisterDTO:",userRegisterDTO);

    let newUser: IUser = new User();
    newUser.authId = userRegisterDTO.authId;
    newUser.userName = userRegisterDTO.userName;
    newUser.email = userRegisterDTO.email;
    newUser.firstName = userRegisterDTO.firstName;
    newUser.lastName = userRegisterDTO.lastName;
    newUser.verified = false;
    newUser.enable = true;
    newUser.verificationCode = "";
    
    const newCat: Promise<boolean> = this.userRepository.create(newUser);
    console.log(newCat);
    return newCat;
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

  async getByQuery(query: any): Promise<IUser> {
    const user =  await this.userRepository.getByQuery(query);
    return user;
}

};
