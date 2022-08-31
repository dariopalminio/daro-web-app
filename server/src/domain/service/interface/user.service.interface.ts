
import { IPersistentAggregate } from '../../model/persistent.aggregate.interface';
import { IUser } from '../../model/user/user.interface';

export interface IUserService<T> extends IPersistentAggregate<T> {
    getByUserName(userName: string): Promise<IUser>;
};