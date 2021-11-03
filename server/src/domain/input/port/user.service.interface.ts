
import { IUser } from '../../model/user/user.interface';
import { UserRegisterDTO } from '../../model/register/user_register.dto.type';

export interface IUserService {

  getAll(): Promise<IUser[]>;
  getById(id: string): Promise<IUser>;
  getByQuery(query: any): Promise<IUser>;
  create(userRegisterDTO: UserRegisterDTO): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  updateById(id: string, user: IUser): Promise<boolean>;
};