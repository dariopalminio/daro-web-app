
import { IUser } from '../../model/user/user.interface';
import { UserRegisterDTO } from '../../model/auth/register/user-register.dto.type';

export interface IUserService {

  getAll(page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<IUser[]>;
  find(query: any, page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<IUser[]>;
  getById(id: string): Promise<IUser>;
  getByQuery(query: any): Promise<IUser>;
  create(userRegisterDTO: UserRegisterDTO): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  updateById(id: string, user: IUser): Promise<boolean>;
};