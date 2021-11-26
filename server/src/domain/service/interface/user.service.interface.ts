
import { IUser } from '../../model/user/user.interface';
import { UserRegisterDTO } from '../../model/auth/register/user-register.dto.type';
import { IPersistentAggregate } from '../../model/persistent.aggregate.interface';

export interface IUserService<T> extends IPersistentAggregate<T> {

};