
import { UserValidatorsYupImpl } from './user.validators.yup.impl';

/**
 * Factory of UserValidation implementation for dependency injection
 */
export class UserValidatorFactory {
    static create(){
        return new UserValidatorsYupImpl();
    }
}