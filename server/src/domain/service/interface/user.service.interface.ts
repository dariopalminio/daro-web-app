
import { UserProfileDTO } from 'src/domain/model/user/user-profile.dto.type';
import { IPersistentAggregate } from '../../model/persistent.aggregate.interface';
import { IUser } from '../../model/user/user.interface';

export interface IUserService<T> extends IPersistentAggregate<T> {
    getByUserName(userName: string): Promise<IUser>;
    updateProfile(userProfileDTO: UserProfileDTO): Promise<boolean>;
};